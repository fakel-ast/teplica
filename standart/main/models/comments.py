from django.db import models


class Comment(models.Model):

    active = models.BooleanField(default=False, verbose_name='Активность')
    image = models.ImageField(verbose_name='Фото пользователя', null=True, blank=True, upload_to='comments/')
    fio = models.CharField(max_length=255, verbose_name='ФИО')
    text = models.TextField(verbose_name='Текст комментария')

    def __str__(self):
        return self.fio

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
