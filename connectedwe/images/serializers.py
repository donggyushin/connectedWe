from rest_framework import serializers
from connectedwe.users import serializers as user_serializers
from . import models




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
    creator = user_serializers.UserSerializers()

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

class SingleImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model= models.Image
        fields = (
            'file',
        )




