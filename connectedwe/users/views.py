from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, ListView, RedirectView, UpdateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserListView(LoginRequiredMixin, ListView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_list_view = UserListView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()





#유저 생성
class CreateNewUser(APIView):

    def post(self, request, format=None):
        
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(data=serializer.data,status=status.HTTP_200_OK)


#유저관련 View
class UserView(APIView):
    
    #신규 유저 최대 50명의 정보 가져오기
    def get (self, request, format=None):
        
        users_on_explore = models.User.objects.all()[:50]
        serializered_users = serializers.UserSerializer(users_on_explore, many=True)
        
        return Response(data=serializered_users.data ,status=status.HTTP_200_OK)



#follow관련 view

class FollowView(APIView):
    
    #follow 하기
    def get(self, request, user_id, format=None):
        
        user = request.user
        #follow할 유저 찾기
        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            #follow할 유저를 못찾았을때
            return Response(status=status.HTTP_404_NOT_FOUND)

        #following에 추가해주기. 
        user.following.add(user_to_follow)

        #그리고 user가 다른 user를 following 하면 following 당하는 user의
        #follower에 following을 요청한 user 가 들어가야함. 
        user_to_follow.followers.add(user)

        return Response(status=status.HTTP_200_OK)

    #unfollow 하기
    def delete(self, request, user_id, format=None):
        
        user = request.user
        try:
            user_to_unfollow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.remove(user_to_unfollow)
        user_to_unfollow.followers.remove(user)
        return Response(status=status.HTTP_200_OK)

class ProfileView(APIView):

    def get(self, request, user_id, format=None):
        
        try:
            user_to_find = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializered = serializers.UserProfileSerializer(user_to_find)

        return Response(data=serializered.data,status=status.HTTP_200_OK)


class onlyForTest(APIView):

    def get(self, request, format=None):
        
        user = request.user

        serializered = serializers.UserSerializers(user)

        return Response(data=serializered.data,status=status.HTTP_200_OK)