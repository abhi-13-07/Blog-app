from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
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

class UserLoginSerializer(serializers.ModelSerializer):

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

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UploadProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['user', 'image']

    def get_user(self, obj):
        obj = User.objects.get(User.id)
        return str(obj.user.image)

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
        ]