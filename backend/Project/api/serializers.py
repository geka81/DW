from rest_framework import serializers
from projectapp.models import Video
from django.conf import settings
from rest_framework.serializers import (
    CharField,
)


class VideoSerializer(serializers.ModelSerializer):
    user_name = CharField(source="user.user_name", read_only=True)

    class Meta:
        model = Video
        fields = ["id", "title", "image", "video", "description", "date_added", "is_active", "user", "user_name", "likes"]
    

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}