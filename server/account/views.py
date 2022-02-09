import jwt, datetime
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, GenericAPIView
from account.serializers import UserRegisterSerializer, UploadProfileSerializer, UserLoginSerializer, UserDetailsSerializer, LogoutSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions
from account.serializers import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterAPIView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data = {
                'user': serializer.data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):


    serializer_class = MyTokenObtainPairSerializer
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User Not Found With This Username !')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password !')
        # Custom Token
        # payload = {
        #     'id' : user.id,
        #     'username' : user.username,
        #     'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        #     'iat' : datetime.datetime.utcnow()
        # }

        # token = jwt.encode(payload, 'secret', algorithm='HS256')
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        refresh_token = str(refresh)
        response = Response()
        response.set_cookie(key='Token', value=token, httponly=True)
        response.data = {
            'access' : token,
            'refresh' : refresh_token,
            'user': {
                'username': user.username,
                'email': user.email
            }
        }
        return response

class LoginRefreshAPIView(APIView):

    def post(self, request):
        username = request.data['username']
        user = User.objects.filter(username=username).first()
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        refresh_token = str()
        response = Response()
        response.set_cookie(key='Token', value=token, httponly=True)
        response.data = {
            'Token' : token,
            'username' : user.username,
            'email' : user.email
        }
        return response

class UserDetailsAPIView(RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDetailsSerializer
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    # lookup_field = 'slug'
    # lookup_url_kwarg = 'slug'

    # def get(self, request, format=None):
    #     data = User.objects.filter(id=User['id']).first()
    #     serializer = self.serializer_class(data, many=True)
    #     serialized_data = serializer.data
    #     return Response(serialized_data, status=status.HTTP_200_OK)
        # token = request.COOKIES.get('Token')
        # if not token:
        #     raise AuthenticationFailed("User Is Unauthenticated !")

        # try:
        #     payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        # except jwt.ExpiredSignatureError:
        #     raise AuthenticationFailed("Can't Decode The Payload, Token May Be Expired !")

        # user = User.objects.filter(id=User['id']).first()
        # serializer = UserRegisterSerializer(user)

        # return Response(serializer.data)

class LogoutAPIView(GenericAPIView):
    #def post(self, request, format=None):
        #permission_classes = [permissions.IsAuthenticated]
        serializer_class = LogoutSerializer

        def post(self, request):
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        #token = request.COOKIES.get('Token')
        # decode_token = jwt.decode(token, 'secret', algorithms='HS256')
        # response = Response()
        # response.delete_cookie(key='Token')
        # if request.COOKIES.get('Token'):
        #     message = {'message' : 'Logout Not Successful'}
        # else: message = {'message' : 'Logout Successful'}
        # return Response(message)
        # try:
        #     refresh_token = request.data.get('refresh_token')
        #     token_obj = RefreshToken(refresh_token)
        #     token_obj.blacklist()
        #     return Response(status=status.HTTP_200_OK)
        # except Exception as e:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        

class ProfileAPIView(APIView):
    serializer_class = UploadProfileSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)