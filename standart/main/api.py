from django.contrib.sites.models import Site
from django.http import JsonResponse
from django.views import View


class ChangeSessionCityView(View):
    def get(self, *args, **kwargs):
        site_domain = self.request.GET.get('site_domain')
        site = Site.objects.filter(domain=site_domain).first()
        if site:
            self.request.session['current_site'] = site.domain
            return JsonResponse({'status': 'ok'})
        return JsonResponse({'status': 'not ok'})
