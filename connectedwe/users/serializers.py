from rest_framework import serializers
from . import models

class UserSerializers(serializers.ModelSerializer):

    class Meta:

        model = models.User
        fields = ('__all__')