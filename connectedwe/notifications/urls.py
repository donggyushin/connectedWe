from django.urls import path
from . import views

app_name = "notifications"

urlpatterns = [
    path("", views.NotificationsView.as_view(), name="gettingNotifications"),
    path("delete/", views.NotificationsView.as_view(), name="delete_all_notifications")
]

