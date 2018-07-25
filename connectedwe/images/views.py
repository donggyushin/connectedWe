from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

# Create your views here.

class Feed(APIView):

    def get(self, request, format=None):

        user = request.user
        #내가 팔로잉하고 있는 모든 유저들 부르기 
        following_users = user.following.all()

        following_images = []

        for following_user in following_users:
            
            following_users_images = following_user.image_set.all()[:2]

            for following_users_image in following_users_images:
                
                following_images.append(following_users_image)


        user_images = user.image_set.all()[:2]

        for user_image in user_images:

            following_images.append(user_image)



        sorted_follwoing_images = sorted(following_images, key=get_key, reverse=True)

        serializer = serializers.ImageSerializer(sorted_follwoing_images, many=True)

        return Response(data=serializer.data)


def get_key(image):

    return image.created_at