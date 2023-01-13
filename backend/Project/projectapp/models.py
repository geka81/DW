from django.db import models
from django.conf import settings
from django.urls import reverse
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'videos/{filename}'.format(filename=filename)


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_pic = models.ImageField(null=True, upload_to="photos/")
    is_active = models.BooleanField(default=True)
    birthday = models.DateField(null=True)

    def __str__(self):
        return str(self.user)

    def get_absolute_url(self):
        return reverse('index')



class Video(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(_("Image"), upload_to=upload_to, default="videos/default.jpg")
    video = models.FileField(_("Video"), upload_to=upload_to, default="videos/default.mp4")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_channel"
    )
    description = models.CharField(max_length=255)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='video_post', null=True, blank=True)
    date_added = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('index')


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="comments")
    comment = models.TextField(null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '%s - %s' % (self.video.title, self.user)

    def get_absolute_url(self):
        return reverse('index')


class Email(models.Model):
    client_name=models.CharField(max_length=255)
    lastname=models.CharField(max_length=255, null=True)
    email=models.EmailField(null=True)
    message=models.TextField()

    def __str__(self):
        return self.client_name