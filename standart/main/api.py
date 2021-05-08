from django.http import JsonResponse
from django.views import View

from main.models import City


class ChangeSessionCityView(View):
    def get(self, *args, **kwargs):
        get_city = self.request.GET.get('city')
        city = City.objects.filter(title=get_city).first()
        if city:
            self.request.session['current_city'] = city.title
            return JsonResponse({'status': 'ok'})
        return JsonResponse({'status': 'not ok'})
