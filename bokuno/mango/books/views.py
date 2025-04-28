from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Genre, Review, User
from .serializers import BookSerializer, GenreSerializer, ReviewSerializer, UserSerializer

# Book List View (ListAPIView) with Genre filtering
class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        genre_name = self.request.query_params.get('genre', None)
        if genre_name:
            # Filter books by the genre name (case-insensitive)
            queryset = queryset.filter(genre__name__iexact=genre_name)
        return queryset

# Book Detail View (APIView)
class BookDetailView(APIView):
    def get(self, request, id, format=None):
        try:
            book = Book.objects.get(pk=id)
            serializer = BookSerializer(book)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# Genre List View (ListAPIView)
class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

# User List View (ListAPIView)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        # Get the query parameters
        user_id = self.request.query_params.get('user')
        book_id = self.request.query_params.get('book')
        
        # Start with the base queryset of all reviews
        queryset = Review.objects.all()
        
        # Filter by user if provided
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        # Filter by book if provided
        if book_id:
            queryset = queryset.filter(book_id=book_id)
        
        return queryset
