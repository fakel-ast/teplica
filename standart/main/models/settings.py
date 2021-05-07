from django.db import models
from django.contrib.sites.models import Site


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
    city = models.CharField(max_length=255, verbose_name='Город')
    address = models.CharField(max_length=255, verbose_name='Адрес')
    site = models.OneToOneField(
        Site, verbose_name='Сайт', blank=True,
        null=True, related_name='settings',
        on_delete=models.CASCADE
    )
    phone = models.CharField(max_length=255, verbose_name='Телефон')

    def __str__(self):
        return f'Настройки для: {self.site.name}'

    class Meta:
        verbose_name = 'Настройка'
        verbose_name_plural = 'Настройки'

    @staticmethod
    def get_current_site_settings(request):
        """ Get setting select city """

        site_domain = request.session.get('current_site')
        if site_domain:
            current_site = Site.objects.filter(domain=site_domain).first()
        else:
            current_site = Site.objects.get_current(request)
        current_settings = Settings.objects.get(site=current_site)
        return current_settings

    def get_phone_for_link(self):
        return ''.join([number for number in self.phone if number.isdigit()])
