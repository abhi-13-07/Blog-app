from  .views import PostListAPIView, PostDetailsAPIView, PostCreateAPIView, PostUpdateAPIView, PostDeleteAPIView
from django.urls import path

urlpatterns = [
    path('api/home/', PostListAPIView.as_view(), name="Lists"),
    path('api/details/<slug>', PostDetailsAPIView.as_view(), name="Details"),
    path('api/create/', PostCreateAPIView.as_view(), name="Create"),
    path('api/update/<slug>', PostUpdateAPIView.as_view(), name="Update"),
    path('api/delete/<slug>', PostDeleteAPIView.as_view(), name="delete"),
    ]