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
            'image_set',
            'following_count',
            'followers_count',
            'images_count',
        )
        
class EditUserProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = models.User
        fields = (
            'id',
            'bio',
            'website',
            'profile_image',

        )


class UserSerializer(serializers.ModelSerializer):
    
    is_following = serializers.SerializerMethodField()

    class Meta:

        model = models.User
        fields = (
            'id',
            'username',
            'name',
            'is_following'
        )

    def get_is_following(self, obj):

        if 'request' in self.context:

            request = self.context['request']

            me = request.user

            if obj in me.following.all():

                return True 

        return False
