from rest_framework import serializers
from .models import Genre, Author, Book, User, Review

# Genre Serializer
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

# Author Serializer
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'bio']

# Book Serializer
class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    genre = GenreSerializer()

    class Meta:
        model = Book
        fields = ['id', 'title', 'synopsis', 'author', 'genre']

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    book = BookSerializer()

    class Meta:
        model = Review
        fields = ['id', 'user', 'book', 'review_text', 'review_score']
