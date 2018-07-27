from rest_framework import serializers
from connectedwe.users import models as user_models
from . import models

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
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    


    class Meta:

        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )


class ImageSerializer(serializers.ModelSerializer):
    

    comment_set = CommentSerializer(many=True)
    like_set = LikeSerializer(many=True)
    creator = BasicUserSerializer()

    class Meta:

        model = models.Image
        fields = (
            'id',
            'created_at',
            'updated_at',
            'file',
            'location',
            'caption',
            'creator',
            'comment_set',
            'like_set',
        )





