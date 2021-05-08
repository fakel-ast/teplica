from django.db import models


class City(models.Model):
    show_default = models.BooleanField(default=False, verbose_name='Показывать по умлочанию')
    title = models.CharField(max_length=255, verbose_name='Название города')
    address = models.CharField(max_length=255, verbose_name='Адрес')
    phone = models.CharField(max_length=255, verbose_name='Телефон')

    def get_phone_for_link(self):
        return ''.join([number for number in self.phone if number.isdigit()])

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

