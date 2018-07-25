from rest_framework import serializers
from connectedwe.users import serializers as userSerializers
from . import models


class CommentSerializer(serializers.ModelSerializer):

    creator = userSerializers.UserSerializer(read_only=True)


    class Meta:

        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )


class LikeSerializer(serializers.ModelSerializer):

    creator = userSerializers.UserSerializer()

    class Meta:
        model = models.Like
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    
    creator = userSerializers.UserSerializer()
    comment_set = CommentSerializer(many=True)
    like_set = LikeSerializer(many=True)

    class Meta:

        model = models.Image
        fields = (
            'created_at',
            'updated_at',
            'file',
            'location',
            'caption',
            'creator',
            'comment_set',
            'like_set',
        )

