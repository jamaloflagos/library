from django.urls import path
from .views import *

urlpatterns = [
    path('books', BookList.as_view(), name='book-list-create'),
    path('books/<int:pk>', BookDetail.as_view(), name='book-detail'),
    path('authors', AuthorList.as_view(), name='author-list'),
    path('authors/<int:pk>', AuthorDetail.as_view(), name='author-detail'),
    path('publishers', PublisherList.as_view(), name='publisher-list'),
    path('publishers/<int:pk>', PublisherDetail.as_view(), name='publisher-detail')
]