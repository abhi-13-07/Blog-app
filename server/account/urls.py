from  . import views
from django.urls import path
from account.views import (
    RegisterAPIView, LogoutAPIView
    , LoginAPIView, UserDetailsAPIView)
    
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/user/<str:pk>', UserDetailsAPIView.as_view(), name='user_details'),
    path('api/auth/login/',LoginAPIView.as_view(), name='login'),
    path('api/auth/logout/', LogoutAPIView.as_view(), name='logout'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterAPIView.as_view(), name="register"),
    # path('api/user/upload/', ProfileAPIView.as_view(), name="profile"),
]
