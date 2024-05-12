from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import (Document, Text)
from .serializers import DocumentSerializer, TextSerializer


class DocumentViewset(ModelViewSet):
    http_method_names = ['options', 'get', 'post', 'patch', 'put', 'delete']
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    def get_serializer_context(self):
        return {'request', self.request}


class TextViewset(ModelViewSet):
    http_method_names = ['options', 'get', 'post', 'patch', 'put', 'delete']
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    
    def get_serializer_context(self):
        return {'request': self.request, 'document': self.kwargs['document_pk']}
