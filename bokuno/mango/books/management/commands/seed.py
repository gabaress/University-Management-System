import random
from django.core.management.base import BaseCommand
from faker import Faker
from books.models import Genre, Author, Book, User, Review  # Adjust the import path

class Command(BaseCommand):
    help = 'Generate random data for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Wipe the database (delete all records)
        self.stdout.write("Clearing the database...")
        Review.objects.all().delete()
        Book.objects.all().delete()
        Author.objects.all().delete()
        Genre.objects.all().delete()
        User.objects.all().delete()

        # Create genres (Sci-Fi and Horror)
        scifi, created = Genre.objects.get_or_create(name='scifi')
        horror, created = Genre.objects.get_or_create(name='horror')

        # Create some authors
        authors = []
        for _ in range(5):
            author = Author.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                bio=fake.text(max_nb_chars=200)
            )
            authors.append(author)

        # Create some users
        users = []
        for _ in range(3):
            user = User.objects.create(
                username=fake.user_name()
            )
            users.append(user)

        # Create some books
        books = []
        for _ in range(5):
            book = Book.objects.create(
                author=random.choice(authors),
                genre=random.choice([scifi, horror]),
                title=fake.sentence(nb_words=4),
                synopsis=fake.text(max_nb_chars=300)
            )
            books.append(book)

        # Create 2-4 reviews per book
        for book in books:
            # Generate 2-4 reviews for each book
            num_reviews = random.randint(2, 4)
            for _ in range(num_reviews):
                Review.objects.create(
                    user=random.choice(users),
                    book=book,
                    review_text=fake.text(max_nb_chars=500),
                    review_score=random.choice([1, 2, 3])  # 1 = Bad, 2 = OK, 3 = Good
                )

        print('Random data generation complete!')
