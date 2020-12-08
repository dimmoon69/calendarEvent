from rest_framework.serializers import ModelSerializer

from planning.models import Event


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date_start', 'start_time', 'end_time']