from rest_framework import routers

from planning.views import EventViewSet

router = routers.DefaultRouter()
router.register('planning', EventViewSet)

urlpatterns = router.urls
