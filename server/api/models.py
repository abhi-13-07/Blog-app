import email
from pyexpat import model
from django.db import models
from account.serializers import UserDetailsSerializer
from rest_framework import serializers
from autoslug import AutoSlugField
from django.template.defaultfilters import slugify
from django.conf import settings
from account.models import User


class BlogPost(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    body = models.TextField(max_length=10000, null=False, blank=False)
    date_published = models.DateTimeField(auto_now_add=True, verbose_name="date published")
    date_updated = models.DateTimeField(auto_now=True, verbose_name="data updated")
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(BlogPost, self).save(*args, **kwargs)
