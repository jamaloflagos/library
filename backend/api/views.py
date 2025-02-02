from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics

def get_object(obj_type, lk_value):
    if obj_type == 'author':
        return Author.objects.filter(id=lk_value).first()
    elif obj_type == 'publisher':
        return Publisher.objects.filter(id=lk_value).first()
    
class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        author_id = self.request.data.get('author_id')
        author_name = self.request.data.get('author_name')
        publisher_id = self.request.data.get('publisher_id')
        publisher_name = self.request.data.get('publisher_name')

        book = serializer.save()

        if author_id:
            author = get_object('author', author_id)
            if author:
                author.books.add(book)
            else:
                pass
        elif author_name:
            new_author = Author.objects.create(name=author_name)
            if new_author:
                new_author.books.add(book)
            else:
                pass

        if publisher_id:
            publisher = get_object('publisher', publisher_id)
            if publisher:
                publisher.books.add(book)
            else:
                pass
        elif publisher_name:
            new_publisher = Publisher.objects.create(name=publisher_name)
            if new_publisher:
                new_publisher.books.add(book)
            else:
                pass
    
    def get_queryset(self):
        queryset = Book.objects.all()
        author_id = self.request.query_params.get('author_id')
        publisher_id = self.request.query_params.get('publisher_id')

        if author_id:
            author = get_object('author', author_id)
            if author:
                queryset = author.books.all()
            else:
                pass
        elif publisher_id:
            publisher = get_object('publisher', publisher_id)
            if publisher:
                queryset = publisher.books.all()
        return queryset
    
class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
class AuthorList(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class PublisherList(generics.ListAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

class PublisherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer