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
        fields = (
            'id',
            'creator',
            'image',
        )


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

    creator = BasicUserSerializer()

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
        )
class SingleImageSerializer(serializers.ModelSerializer):
    
    comment_set = CommentSerializer(many=True)
    creator = BasicUserSerializer()
    
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
            'comment_count'
        )

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

