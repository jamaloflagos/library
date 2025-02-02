from django.db import models

# Create your models here.
# class Book(models.Model):
#     title = models.CharField(max_length=255)
#     # book_format = models.CharField(max_length=4)

# class Author(models.Model):
#     name = models.CharField(max_length=255)
#     books = models.ManyToManyField(Book, related_name='author')

# class Publisher(models.Model):
#     name = models.CharField(max_length=255)
#     books = models.ManyToManyField(Book, related_name='publisher')
    
class Author(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Book(models.Model):
    CATEGORY_CHOICES = [
        ('النحو', 'nahw'),
        ('الصرف', 'sorf'),
        ('العروض', 'arud'),
    ]
    FORMAT_CHOICES = [
        ('ورقية', 'hard'),
        ('إلكترونية', 'soft')
    ]

    # cover = models.ImageField()
    title = models.CharField(max_length=255)
    book_format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    book_category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books', null=True)  
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name='books', null=True)  

    def __str__(self):
        return self.title