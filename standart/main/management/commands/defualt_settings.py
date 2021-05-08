from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

from main.models import City, Settings, Comment, Product


class Command(BaseCommand):
    help = 'Create default settings and city'

    def handle(self, *args, **options):
        self.create_city_and_setting()
        self.create_admin()
        self.create_comments()
        self.create_product()

    def create_city_and_setting(self):
        data_moscow = {
            'title': 'Москва',
            'address': 'Москва, ул. Лениниа, д. 25',
            'phone': '8-985-344-76-46',
        }

        data_moscow_settings = {
            'video_url': 'https://www.youtube.com/watch?v=VFBXx7O9BxU&t',
            'coords': '55.75, 37.61',
            'balloon_text': 'Москва, ул. Лениниа, д. 25 <br> Телефон: 8-985-344-76-46',
        }

        data_vologda = {
            'title': 'Вологда',
            'address': 'Вологлда, ул. Дальяя, д. 25',
            'phone': '8-123-344-66-55',
        }

        data_vologda_settings = {
            'video_url': 'https://www.youtube.com/watch?v=VFBXx7O9BxU&t',
            'coords': '59.219248, 39.891235',
            'balloon_text': 'Вологлда, ул. Дальяя, д. 25 <br> Телефон: 8-123-344-66-55',
        }

        data_voronezh = {
            'title': 'Воронеж',
            'address': 'Воронеж, ул. Пома, д. 13',
            'phone': '8-321-344-66-55',
        }

        data_voronezh_settings = {
            'video_url': 'https://www.youtube.com/watch?v=VFBXx7O9BxU&t',
            'coords': '51.672, 39.1843',
            'balloon_text': 'Воронеж, ул. Тому, д. 25 <br> Телефон: 8-321-344-66-55',
        }

        print('creating city and settings')

        moscow_city = City.objects.create(**data_moscow)
        Settings.objects.create(city=moscow_city, **data_moscow_settings)

        vologda_city = City.objects.create(**data_vologda)
        Settings.objects.create(city=vologda_city, **data_vologda_settings)

        voronezh_city = City.objects.create(**data_voronezh)
        Settings.objects.create(city=voronezh_city, **data_voronezh_settings)

    def create_admin(self):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(username='admin', password='01gitybwf10')
            print('admin user create')

    def create_comments(self):
        comment_text = 'Kрaб-сиcтeмa в тeчение нескoльких лeт заcлужилa выcoкую репутацию cpeди дaчникoв и ' \
                       'пpоизводителей тeплиц и дpугих малыx дачных сoopужений. Прoстaя и быстpая сбоpка, ' \
                       'oтcутствие свapки, оцинкованный кpепеж пoзволяют cоздaвать тeплицы, душeвые, веpcтaки,' \
                       ' стeллaжи из крепежа за минимальнoе время.'
        for name in ['Михаил Викторович', 'Светлана Альбертовна', 'Андрей Олегович']:
            Comment.objects.create(fio=name, text=comment_text, active=True)
            print(name, 'comments create')

    def create_product(self):
        for i in range(1, 5):
            print(f'crate product - {i}')
            Product.objects.create(
                show_on_index=True,
                title='Т-образная краб-система 20х20',
                image_small=f'/products/product_{i}.jpg',
                image_big=f'/products/product_{i}_big.jpg',
                price=20,
            )


