from django.urls import path, include
from rest_framework_nested import routers

from .models import (Document, Text)
from .views import (DocumentViewset, TextViewset)

router = routers.DefaultRouter()
router.register("documents", DocumentViewset)

document_router = routers.NestedDefaultRouter(router, "documents", lookup="document")
document_router.register('texts', TextViewset, basename='document-text')


urlpatterns = router.urls + document_router.urls