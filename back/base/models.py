from django.db import models

# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=255)
    lenght = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return f"{self.name}"


class Text(models.Model):
    TEXT_CHOICES = (
        ('h1', 'Heading 1'),
        ('h2', 'Heading 2'),
        ('h3', 'Heading 3'),
    )
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=TEXT_CHOICES)
    content = models.TextField()
    def __str__(self) -> str:
        return f"{self.document}: {self.content}"