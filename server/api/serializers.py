import markdown
from .models import BlogPost, Like
from account.models import User
from rest_framework import serializers
from account.serializers import UserDetailsSerializer
from rest_framework.serializers import SerializerMethodField


class BlogListSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    date_updated = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    user_details = serializers.SerializerMethodField('get_author_details')

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'date_published', 'date_updated', 'likes','user', 'user_details', 'slug']

    def get_author_details(self, blog_post):
        profile = str(blog_post.user.profile_image)
        user_details = {
        'username' : blog_post.user.username,
        'profile_image' : f'media/{profile}'
        }
        return user_details

class BlogDetailsSerializer(serializers.ModelSerializer):
    date_published = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    date_updated = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'body', 'date_published', 'date_updated', 'likes', 'user', 'slug']

class BlogCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = BlogPost
        fields = '__all__'
class BlogUpdateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'body', 'user', 'slug']

class BlogDeleteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = BlogPost
        fields = '__all__'

class PostLikeSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Like
        fields = '__all__'