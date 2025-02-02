from .models import *
from rest_framework import serializers

# class BookSerializer(serializers.ModelSerializer):
#     author = serializers.SerializerMethodField()
#     publisher = serializers.SerializerMethodField()

#     class Meta:
#         model = Book
#         fields = '__all__'
    
#     def get_author(self, obj):
#         return f"{obj.author.name}"
    
#     def get_publisher(self, obj):
#         return f"{obj.publisher.name}"

# class AuthorSerializer(serializers.ModelSerializer):
#     books = serializers.SerializerMethodField()

#     class Meta:
#         model = Author
#         fields = '__all__'

#     def get_books(self, obj):
#         return BookSerializer(obj.books.all(), many=True).data 

# class PublisherSerializer(serializers.ModelSerializer):
#     books = serializers.SerializerMethodField()

#     class Meta:
#         model = Publisher
#         fields = '__all__'

#     def get_books(self, obj):
#         return BookSerializer(obj.books.all(), many=True).data 

class BookSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField() 
    publisher = serializers.StringRelatedField()  
    format = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = '__all__'
        extra_kwargs = {
            'book_format': {'write_only': True},
            'book_category': {'write_only': True}
        }

    def get_format(self, obj):
        return obj.get_book_format_display()
    
    def get_category(self, obj):
        return obj.get_book_category_display()

class AuthorSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True) 

    class Meta:
        model = Author
        fields = ['id', 'name', 'books']

class PublisherSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True) 

    class Meta:
        model = Publisher
        fields = ['id', 'name', 'books']
