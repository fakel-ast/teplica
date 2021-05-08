from django.db import models

from main.models import City


class Settings(models.Model):

    # Video block
    video_url = models.CharField(
        max_length=255, verbose_name='Ссылка на видео',
        help_text='Формат ссылки: "https://www.youtube.com/watch?v=otCL-UXvcvo"'
    )

    # Map block
    coords = models.CharField(
        max_length=255, verbose_name='Координаты метки на карте',
        help_text='Формат данных: "55.71, 89.99"'
    )
    balloon_text = models.TextField(verbose_name='Контент балуна на карте')

    # city
    city = models.ForeignKey(
        City, verbose_name='Город', blank=True,
        null=True, related_name='settings',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Настройки для: {self.city.title}'

    class Meta:
        verbose_name = 'Настройка'
        verbose_name_plural = 'Настройки'


