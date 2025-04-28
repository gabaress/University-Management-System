from django.db import models

# Genre Model
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)

    def __str__(self):
        return self.name.lower()

# Author Model
class Author(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    bio = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Book Model
class Book(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(Author, related_name='books', on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, related_name='books', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    synopsis = models.TextField()

    def __str__(self):
        return self.title

# User Model
class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.username

# Review Model
class Review(models.Model):
    BAD = 1
    OK = 2
    GOOD = 3
    REVIEW_SCORE_CHOICES = [
        (BAD, 'Bad'),
        (OK, 'OK'),
        (GOOD, 'Good')
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    review_text = models.TextField()
    review_score = models.IntegerField(choices=REVIEW_SCORE_CHOICES)

    def __str__(self):
        return f"Review by {self.user.username} for {self.book.title}"
