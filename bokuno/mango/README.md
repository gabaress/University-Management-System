# React Resit 1 API Code

**NOTE**: A database has not been provided and as such a superuser has not been created.

This code was testing on **Python 3.10.16**.

To install the requirements:
```bash
python3 -m pip install -r requirements.txt
```

To creat the database:

```bash
python manage.py makemigrations
python manage.py migrate
```

To generate random database data (this **will** delete existing data):
````bash
python manage.py seed
```
