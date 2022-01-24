from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.serializers import SerializerMethodField
from .models import Profile

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):

    password1 = serializers.CharField(min_length=6, required=True, write_only=True)
    password2 = serializers.CharField(min_length=6, required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2'
        ]
        extra_kwargs = {
            'password1' : {'write_only' : True},
            'password2' : {'write_only' : True},
        }
    
    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password1 = validated_data.get('password1')
        password2 = validated_data.get('password2')
        if password1 == password2:
            user = User(username=username, email=email)
            user.set_password(password1)
            user.save()
            return user
        else:
            raise serializers.ValueError({
                'error' : "Both passwords doesn't match each other !"
            })
        return super().create(validated_data)

from django.contrib.auth.models import User

class UploadProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['user', 'image']

    def get_user(self, obj):
        obj = User.objects.get(User.id)
        return str(obj.user.image)