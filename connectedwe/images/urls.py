from django.urls import path
from . import views

app_name = "images"

urlpatterns = [
    path("", view=views.ImageView.as_view(), name="Feed"),
    path("search/", views.SearchByHashtags.as_view(), name="searchByHashtags"),
    path("upload/", views.ImageView.as_view(), name="upload_image"),
    path("<int:image_id>/single/", views.SingleImageView.as_view(), name="get_single_photo"),
    path("<int:image_id>/edit/", views.SingleImageView.as_view(), name="edit_single_image"),
    path("<int:image_id>/delete/", views.SingleImageView.as_view(), name="delete_single_image"),
    path("<int:image_id>/like/", view=views.LikeView.as_view(), name="likeImage"),
    path("<int:image_id>/unlike/", view=views.LikeView.as_view(), name="unlikeImage"),
    path("<int:image_id>/comment/", views.CommentView.as_view(), name="comment_on_image"),
    path("<int:image_id>/like/list/", views.LikeListView.as_view(), name="getting_like_list"),
    path("<int:comment_id>/myimage/delete/", views.DeleteCommentOnMyImage.as_view(), name="delete_on_may_image"),
    path("comment/<int:comment_id>/", views.CommentView.as_view(), name="delete_comment"),
]

