from django.urls import path, include
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

# Import your views here
from . import views

urlpatterns = [
    # Books
    path('api/book/', views.BookListView.as_view(), name='book-list'),
    path('api/book/<int:id>/', views.BookDetailView.as_view(), name='book-detail'),
    
    # Reviews
    path('api/review/', views.ReviewListView.as_view(), name='review-list'),
    
    # Genres
    path('api/genre/', views.GenreListView.as_view(), name='genre-list'),
    
    # Users
    path('api/user/', views.UserListView.as_view(), name='user-list'),

    # Schema generation (OpenAPI)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # Swagger UI
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
