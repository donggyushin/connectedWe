from rest_framework import serializers
from . import models
from connectedwe.images import models as image_models
from connectedwe.users import models as user_models

class SingleImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = image_models.Image
        fields= (
            'id',
            'file'
        )

class CreatorNameSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = user_models.User
        fields = (
            'id',
            'username'
        )




class NotificationsSerializer(serializers.ModelSerializer):
    
    image = SingleImageSerializer()
    creator = CreatorNameSerializer()
    to = CreatorNameSerializer()

    class Meta:

        model = models.Notification
        fields = (
            'id',
            'creator',
            'to',
            'image',
            'notification_types'
        )
