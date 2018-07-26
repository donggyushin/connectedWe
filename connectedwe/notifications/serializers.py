from rest_framework import serializers
from . import models
from connectedwe.images import models as image_models

class SingleImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = image_models.Image
        fields= (
            'id',
            'file'
        )


class NotificationsSerializer(serializers.ModelSerializer):
    
    image = SingleImageSerializer()

    class Meta:

        model = models.Notification
        fields = (
            'id',
            'creator',
            'to',
            'image'
        )