from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models
from . import serializers

# Create your views here.


class NotificationsView(APIView):

    def get(self, request, format=None):
        me = request.user
        notifications = models.Notification.objects.filter(to = me)
        
        serializered = serializers.NotificationsSerializer(notifications, many=True)
        

        return Response(data=serializered.data,status=status.HTTP_200_OK)


def create_notifications(creator, to, notification_type, image = None):

    new_notification = models.Notification.objects.create(
        creator = creator,
        to = to,
        notification_types = notification_type,
        image = image
    )

    new_notification.save()

