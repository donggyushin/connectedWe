from django.db import models
from connectedwe.users import models as user_models
from connectedwe.images import models as image_models

# Create your models here.

class TimeStampledModel(models.Model):
    
    created_at = models.DateTimeField( auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True, auto_now_add=False)

    class Meta:
        abstract = True


class Notification(TimeStampledModel):
    
    NOTIFICATION_TYPE = (
        ('follow', 'Follow'),
        ('comment', 'Comment'),
        ('like', 'Like'),
        
    )
    
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name="creator_set")
    to = models.ForeignKey(user_models.User, on_delete=models.CASCADE, related_name="to_set")
    image = models.ForeignKey(image_models.Image, on_delete=models.CASCADE, null=True, blank=True)
    notification_types = models.CharField(max_length=50, choices=NOTIFICATION_TYPE)

    def __str__(self):
        return "{} {} {}".format(self.creator, self.to, self.notification_types)
    
    
