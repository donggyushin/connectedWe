from rest_framework import serializers
from connectedwe.users import models as user_models
from . import models
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

class BasicUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = user_models.User
        fields = (
            'id',
            'username',
            'name',
            'profile_image',
        )




class LikeSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = models.Like
        fields = (
            'id',
            'creator',
            'image',
        )

class creatorSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = user_models.User
        fields = (
            'id',
            'username'
        )


class CommentSerializer(serializers.ModelSerializer):
    
    creator = creatorSerializer()

    class Meta:

        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )


class ImageSerializer(serializers.ModelSerializer):
    

    comment_set = CommentSerializer(many=True)
    hashtags = TagListSerializerField()
    creator = BasicUserSerializer()
    is_liked = serializers.SerializerMethodField()

    class Meta:

        model = models.Image
        fields = (
            'id',
            'naturalTime',
            'updated_at',
            'file',
            'location',
            'caption',
            'creator',
            'comment_set',
            'like_count',
            'comment_count',
            'hashtags',
            'is_liked'
        )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.Like.objects.get(creator=request.user, image=obj)
                return True
            except models.Like.DoesNotExist:
                return False
        else:
            return False

class SingleImageSerializer(serializers.ModelSerializer):
    
    
    comment_set = CommentSerializer(many=True)
    creator = BasicUserSerializer()
    hashtags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        
        model = models.Image
        fields = (
            'id',
            'file',
            'caption',
            'like_count',
            'naturalTime',
            'comment_set',
            'creator',
            'comment_count',
            'hashtags',
            'is_liked'
        )
    def get_is_liked(self, obj):
        
        
        
        if 'request' in self.context:
           
            request = self.context['request']
            try:
                print(request.user.id)
                print(obj.id)
                models.Like.objects.get(creator__id=request.user.id, image__id=obj.id)
                return True 
            except models.Like.DoesNotExist:
                return False 
        return False

class LikeListSerializer(serializers.ModelSerializer):
    
    creator = BasicUserSerializer()
    
    class Meta:
        
        model = models.Like
        fields = (
            'id',
            'creator',
        )



class EditImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Image
        fields= (
            'id',
            'caption',
            'location',
            'file',
        )

