from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    
    search_fields = (
        "location",
        "creator"
    )

    list_display = (
        'created_at',
        'updated_at',
        'file',
        'location',
        'caption',
        'creator',
    )


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    
    search_fields = ['creator']
    
    list_display = (
        'id',
        'created_at',
        'updated_at',
        'message',
        'creator',
        'image',
    )

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    
    search_fields=['creator']
    list_display = (
        'created_at',
        'updated_at',
        'creator',
        'image',
    )



