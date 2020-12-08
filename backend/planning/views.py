from rest_framework.viewsets import ModelViewSet

from planning.models import Event
from planning.serializers import EventSerializer


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
