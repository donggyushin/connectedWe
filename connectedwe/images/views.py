from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from connectedwe.users import models as user_models
from connectedwe.users import serializers as user_serializers
from connectedwe.notifications import views as notifications_views

# Create your views here.


# Feed 불러오기, 내가 팔로잉한 사람들의 피드를 5개씩 끊어서 불러올 수 있다. 
# 정렬 순서는 시간순의 역순으로
class ImageView(APIView):

    def get(self, request, format=None):

        user = request.user
        #내가 팔로잉하고 있는 모든 유저들 부르기 
        following_users = user.following.all()

        following_images = []

        for following_user in following_users:
            
            following_users_images = following_user.image_set.all()[:5]

            for following_users_image in following_users_images:
                
                following_images.append(following_users_image)


        user_images = user.image_set.all()[:5]

        for user_image in user_images:

            following_images.append(user_image)
     

        image_count = len(following_images)

        if image_count == 0 :
            
            return Response(status=status.HTTP_204_NO_CONTENT)





        sorted_follwoing_images = sorted(following_images, key=get_key, reverse=True)

        serializer = serializers.ImageSerializer(sorted_follwoing_images, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        me = request.user

        image_to_upload = request.data
        serializered = serializers.EditImageSerializer(data=image_to_upload)

        if serializered.is_valid():
            serializered.save(creator=me)
        else :
            return Response(data = serializered.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(data = serializered.data,status=status.HTTP_200_OK)


def get_key(image):

    return image.created_at



#좋아요 누르기. 
#중복된 좋아요 누르면 status=404 반환

class LikeView(APIView):

    def post(self, request,image_id,  format=None):

        foundImage = models.Image.objects.get(id=image_id)

        try:
            already_like = models.Like.objects.get(
                creator = request.user,
                image = foundImage
            )

            return Response(status=status.HTTP_400_BAD_REQUEST)
        except models.Like.DoesNotExist:
            
            new_like = models.Like.objects.create(
                creator = request.user,
                image = foundImage
            )
            

            new_like.save()
            #create_notifications(creator, to, notification_type, image = None):
            #creator = request.user
            #to = foundImage.creator
            #notification = 'like'
            #image = foundImage
            notifications_views.create_notifications(request.user, foundImage.creator, 'like', foundImage)


            return Response(status=status.HTTP_200_OK)

    def delete(self, request, image_id, format=None):

        try:

            foundLike = models.Like.objects.get(
                creator=request.user,
                image=models.Image.objects.get(id=image_id)
            )
        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        foundLike.delete()

        return Response(status=status.HTTP_200_OK)



    

#댓글 관련 View
class CommentView(APIView):
    #댓글 삭제하기
    def delete (self, request, comment_id,format=None):
        
        
        
        try:
            #해당 댓글 불러오기 
            comment_to_delete = models.Comment.objects.get(id=comment_id)
            #해당 불러온 댓글이 user 가 쓴 댓글이 맞는지 확인하기
            if comment_to_delete.creator.id == request.user.id:
                #만약에 동일한 유저가 맞다면 삭제해주기
                comment_to_delete.delete()
                return Response(status=status.HTTP_200_OK)
            #comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            #찾지 못하였을경우
            return Response(status=status.HTTP_404_NOT_FOUND)

        
        #댓글은 존재하나, 본인의 댓글이 아닐 경우 권한이 없음
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request,  image_id, format=None):
        

        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user, image=models.Image.objects.get(id=image_id))
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        image = models.Image.objects.get(id=image_id)

        #create_notifications(creator, to, notification_type, image = None):
   
        notifications_views.create_notifications(request.user, image.creator, 'comment', image=image)
        

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class SearchByHashtags(APIView):
    
    def get(self, request, format=None):
        
        hashtags = request.query_params.get('hashtags', None)
        hashtags = hashtags.split(",")
        #hashtags로 걸러진 image들
        images_to_find = models.Image.objects.filter(hashtags__name__in=hashtags).distinct()
        serializered = user_serializers.SingleImageSerializers(images_to_find, many=True)

        return Response(data=serializered.data,status=status.HTTP_200_OK)


#내 이미지에 달린 댓글 지우기
class DeleteCommentOnMyImage(APIView):
    
    def delete(self, request,comment_id ,format=None):
        
        me = request.user
        

        comment = models.Comment.objects.get(id=comment_id)
        ImageFound = comment.image
        
        if ImageFound.creator == me :
            
            comment.delete()
        else :
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        return Response(status=status.HTTP_200_OK)


class SingleImageView(APIView):
    
    def get(self, request,image_id ,format=None):
        
        singlePhoto = models.Image.objects.get(id=image_id)
        serializered = serializers.SingleImageSerializer(singlePhoto, context={'request':request})
        
        
        return Response(data=serializered.data,status=status.HTTP_200_OK)

    def put(self, request, image_id, format=None):
        
        image_to_edit = models.Image.objects.get(id=image_id)
        me = request.user
        image_creator = image_to_edit.creator
        if me != image_creator:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        
        serializered = serializers.EditImageSerializer(image_to_edit, data=request.data, partial=True)
        

        if serializered.is_valid():
            
            serializered.save()
        else :
            return Response(data= serializered.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=serializered.data,status=status.HTTP_200_OK)

    def delete(self, request, image_id, format=None):
        
        image_to_delete = models.Image.objects.get(id=image_id)
        image_creator = image_to_delete.creator
        me = request.user

        if me != image_creator:
            
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        image_to_delete.delete()
        
        return Response(status=status.HTTP_200_OK)
        
class LikeListView(APIView):

    def get(self, request, image_id, format=None):
        
        ImageFound = models.Image.objects.get(id=image_id)
        like_list = models.Like.objects.filter(image=ImageFound)
        serializered = serializers.LikeListSerializer(like_list, many=True, context={'request':request})

        return Response(data=serializered.data,status=status.HTTP_200_OK)