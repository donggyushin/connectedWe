from django.urls import path
from . import views
from django.conf.urls import include, url

from connectedwe.users.views import (
    user_list_view,
    user_redirect_view,
    user_update_view,
    user_detail_view,
)

app_name = "users"
urlpatterns = [
    path("", view=user_list_view, name="list"),
    path("explore/", views.UserView.as_view(), name="explore_user"),
    path("new/", views.CreateNewUser.as_view(), name="create_new_user"),
    path("followers/", views.GetFollowersList.as_view(), name="followerlist"),
    path("following/", views.GetFollowingList, name="followinglist"),
    path("search/", views.SearchByUsername.as_view(), name="searchByUsername"),
    path("id/", views.UserIdView.as_view(), name="getMyUserId"),
    path("notifications/", views.NotificationView.as_view(), name="get_notification_count"),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    path("<int:user_id>/profile/", views.ProfileView.as_view(), name="user_profile"),
    path("<int:user_id>/follow/", views.FollowView.as_view(), name="follow_user"),
    path("<int:user_id>/unfollow/", views.FollowView.as_view(), name="unfollow_user"),
    path("<int:user_id>/edit/", views.ProfileView.as_view(), name="edit_user_profile"),
    path("<int:user_id>/password/", views.PasswordView.as_view(), name="edit_password"),
    
    
]


#

#{
#    "username": "username",
#    "name": "name",
#    "password1": "password1",
#    "password2": "password2",
#    "phone": "01012341234",
#    "gender": "male"
#}
#
