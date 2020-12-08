from django.db import models


class Event(models.Model):
    title = models.CharField("Название", max_length=100)
    date_start = models.DateField("Дата")
    start_time = models.TimeField("Начало")
    end_time = models.TimeField("Конец")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']