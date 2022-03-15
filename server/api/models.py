import hashlib, uuid
from pyexpat import model
from django.db import models
from account.serializers import UserDetailsSerializer
from rest_framework import serializers
from django.template.defaultfilters import slugify
from django.conf import settings
from account.models import User


class BlogPost(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    body = models.TextField(max_length=10000, null=False, blank=False)
    date_published = models.DateTimeField(auto_now_add=True, verbose_name="date published")
    date_updated = models.DateTimeField(auto_now=True, verbose_name="data updated")
    likes = models.ManyToManyField(User, default=None, blank=True, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.title

    def like_count(self):
        return self.likes.all().count()

    def save(self, *args, **kwargs):
        if not self.id:
            clean_string = self.title
            salt = uuid.uuid4().hex
            print(salt)
            self.slug = int(hashlib.sha512(clean_string.encode('utf-8') + salt.encode('utf-8')).hexdigest(), 16) % (10 ** 8)
        super(BlogPost, self).save(*args, **kwargs)

LIKE_CHOICES = (
    ('Like', 'Like'),
    ('Dislike', 'Dislike')

)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, )
    post = models.ForeignKey(BlogPost,on_delete=models.CASCADE)
    value = models.CharField(choices=LIKE_CHOICES, default='Like', max_length=10)

    def __str__(self):
        return str(self.post)