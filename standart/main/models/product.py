from django.db import models


class Product(models.Model):

    show_on_index = models.BooleanField(verbose_name='Показывать на главной', default=False)
    title = models.CharField(max_length=255, verbose_name='Название товара')
    image_small = models.ImageField(verbose_name='Маленькое фото товара', upload_to='products/', null=True, blank=True)
    image_big = models.ImageField(verbose_name='Большое фото товара', upload_to='products/', null=True, blank=True)
    price = models.DecimalField(
        max_digits=7, decimal_places=2,
        verbose_name='Цена за 1 комплект',
        null=True, blank=True
    )
    count = models.PositiveIntegerField(verbose_name='Максимальное количество товаров', default=0, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
