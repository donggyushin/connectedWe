from django.urls import path
from . import views

app_name = "images"

urlpatterns = [
    path("", view=views.ImageView.as_view(), name="Feed"),
    path("search/", views.SearchByHashtags.as_view(), name="searchByHashtags"),
    path("<int:image_id>/like/", view=views.LikeView.as_view(), name="likeImage"),
    path("<int:image_id>/unlike/", view=views.LikeView.as_view(), name="unlikeImage"),
    path("<int:image_id>/comment/", views.CommentView.as_view(), name="comment_on_image"),
    path("<int:comment_id>/myimage/delete/", views.DeleteCommentOnMyImage.as_view(), name="delete_on_may_image"),
    path("comment/<int:comment_id>", views.CommentView.as_view(), name="delete_comment"),
]

