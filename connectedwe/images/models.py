from django.db import models
from connectedwe.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime

# Create your models here.
class TimeStampedModel(models.Model):
    
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)

    

    class Meta:
        abstract = True


class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField( max_length=140, blank=True)
    caption = models.TextField(blank= True)
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    hashtags = TaggableManager(blank=True)

    @property
    def like_count(self):
        
        return self.like_set.all().count()

    @property
    def naturalTime(self):
        
        return naturaltime(self.created_at)

    @property
    def comment_count(self):
        
        return self.comment_set.all().count()
    

    def __str__(self):
        return "{} - {} - {}".format(self.location, self.caption, self.creator)
    


class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "{} : {} - {}".format(self.creator, self.message, self.image)
    

class Like(TimeStampedModel):

    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "{} - {}".format(self.creator,self.image)
    
