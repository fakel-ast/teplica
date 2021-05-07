from django.contrib import admin

from main import models


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_filter = ['show_on_index']


@admin.register(models.Settings)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ['title']
    fieldsets = (
        ('Видео блок', {
            'fields': ['video_url']
        }),
        ('Карта', {
            'fields': ['coords', 'balloon_text']
        }),
        ('Информация о филлиале', {
            'fields': ['city', 'address', 'site', 'phone']
        })
    )


@admin.register(models.Comment)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ['fio', 'text']


