from django.urls import path
from . import views

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
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    
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
