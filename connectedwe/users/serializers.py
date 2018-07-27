from rest_framework import serializers
from connectedwe.images import models as image_models
from . import models

class SingleImageSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = image_models.Image
        fields = (
            'id',
            'file'
        )


class UserProfileSerializer(serializers.ModelSerializer):
    
    image_set = SingleImageSerializers(many=True)

    class Meta:

        model = models.User
        fields = (
            'id',
            'username',
            'name',
            'bio',
            'website',
            'profile_image',
            'image_set'
        )
        
class EditUserProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.User
        fields = (
            
            'bio',
            'website',
            'profile_image',

        )