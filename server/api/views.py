from django.http import request
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from api.models import BlogPost
from  .serializers import BlogDetailsSerializer, BlogListSerializer, BlogCreateSerializer, BlogUpdateSerializer, BlogDeleteSerializer
from rest_framework import status
from rest_framework import permissions

class PostListAPIView(APIView):
    serializer_class = BlogListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, slug):
        try:
            BlogPost.objects.get(slug)
        except BlogPost.DoesNotExist:
            raise  status.HTTP_404_NOT_FOUND

    def get(self, request, format=None):
        data = BlogPost.objects.all()
        serializer = self.serializer_class(data, many=True)
        serialized_data = serializer.data
        return Response(serialized_data, status=status.HTTP_200_OK)

class PostDetailsAPIView(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDetailsSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

class PostCreateAPIView(APIView):
    serializer_class = BlogCreateSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostUpdateAPIView(UpdateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogUpdateSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

class PostDeleteAPIView(DestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDeleteSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'