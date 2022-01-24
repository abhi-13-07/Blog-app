from .models import BlogPost
from django.db.models import fields
from rest_framework import serializers
from datetime import datetime


class BlogListSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    date_updated = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'date_published', 'date_updated', 'author', 'slug']

class BlogDetailsSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    date_updated = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'body', 'date_published', 'date_updated', 'author', 'slug']


class BlogCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogUpdateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogDeleteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = BlogPost
        fields = '__all__'