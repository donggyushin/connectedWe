from django.urls import path
from . import views

app_name = "images"

urlpatterns = [
    path("all/", view = views.ListAllImages.as_view(), name="allImages"),
    path("comments/", view = views.ListAllComments.as_view(), name="allComments"),
    path("likes/", view= views.ListAllLikes.as_view(), name="allLikes")
]

