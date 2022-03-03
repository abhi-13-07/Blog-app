from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .models import User

class UserRegisterSerializer(serializers.ModelSerializer):

    password1 = serializers.CharField(min_length=6, required=True, write_only=True)
    password2 = serializers.CharField(min_length=6, required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'password1',
            'password2',
            'birth_date',
            'city',
            'country',
            'profile_image'
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

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password', ''),
            'birth_date': self.validated_data.get('birth_date', ''),
            'city': self.validated_data.get('city', ''),
            'country': self.validated_data.get('country', ''),
            'profile_image' : self.validated_data.get('profile_image', '')
        }

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

# class UploadProfileSerializer(serializers.ModelSerializer):
#     user = serializers.SerializerMethodField()
#     class Meta:
#         model = Profle
#         fields = ['user', 'image']

#     def get_user(self, obj):
#         obj = User.objects.get(User.id)
#         return str(obj.user.image)

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'profile_image'
        ]