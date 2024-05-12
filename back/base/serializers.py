from rest_framework import serializers
from .models import (Document, Text)

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name']

class TextSerializer(serializers.ModelSerializer):
    heading_level = serializers.SerializerMethodField()
    class Meta:
        model = Text
        fields = ['id', 'type', 'content', 'document', 'heading_level']
        
    def get_heading_level(self, obj):
        if obj.type == 'h1': return "##"
        elif obj.type == 'h2': return "##"
        elif obj.type == 'h3': return "###"