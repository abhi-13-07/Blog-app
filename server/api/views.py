import bleach, markdown
from account.serializers import User, UserDetailsSerializer
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from api.models import BlogPost, Like
from  .serializers import (BlogDetailsSerializer, BlogListSerializer, BlogCreateSerializer, 
BlogUpdateSerializer, BlogDeleteSerializer, PostLikeSerializer)
from rest_framework import status


class PostLikeAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostLikeSerializer

    def Post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        user = request.user
        post_id = request.post
        post_obj = BlogPost.objects.get(id=request.post)
        if serializer.is_valid():
            if user in post_obj.likes.all():
                post_obj.likes.remove(user)
            else:
                post_obj.likes.add(user)

            like, created = Like.objects.get_or_create(user=user, post=post_id)
            if not created:
                if like.value == 'Like':
                    like.value = 'Dislike'
                else:
                    like.value = 'Like'
            like.save()
            serializer.save(user=self.request.user)
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostListAPIView(APIView):
    # serializer_class = BlogListSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        post = BlogPost.objects.all()
        post_serializer = BlogListSerializer(post, many=True)
        serialized_data = post_serializer.data
        return Response(serialized_data, status=status.HTTP_200_OK)

class PostDetailsAPIView(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDetailsSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    # def get_object(self, slug):
    #     try:
    #         BlogPost.objects.get(slug)
    #     except BlogPost.DoesNotExist:
    #         raise  status.HTTP_404_NOT_FOUND    

class PostCreateAPIView(APIView):
    serializer_class = BlogCreateSerializer
    
    def post(self, request, format=None):
        raw_markdown = str(request.data['body'])
        sanitized_body = bleach.clean(raw_markdown)
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=self.request.user, body=sanitized_body)
            serialized_data = serializer.data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostUpdateAPIView(RetrieveUpdateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogUpdateSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class PostDeleteAPIView(DestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogDeleteSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'