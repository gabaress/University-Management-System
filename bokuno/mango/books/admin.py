from django.contrib import admin

# Register your models here.
from .models import *

for model in Genre, Author, Book, User, Review:
    admin.site.register(model)
