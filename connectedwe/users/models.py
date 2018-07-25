from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified', 'Not Specified')
    )

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = CharField(_("Name of User"), blank=True, max_length=255)
    website = models.URLField(_("webiste"), max_length=200, null=True, blank=True)
    bio = models.TextField(_("bio"), null=True, blank=True)
    phone = models.CharField(_("phone"), max_length=50, blank=True, null=True)
    gender = models.CharField(_("gender"), max_length=50, choices=GENDER_CHOICES, null=True)
    followers = models.ManyToManyField("self", blank=True)
    following = models.ManyToManyField("self", blank=True)
    profile_image = models.ImageField(_("profile_image"), max_length=None, null=True, blank=True)
    #image_set

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
