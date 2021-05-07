from django.contrib.sites.models import Site

from main.models.settings import Settings


def website_settings(request):
    data = {}

    session_site = request.session.get('current_site')

    if session_site:
        current_site = Site.objects.filter(domain=session_site).first()
    else:
        current_site = Site.objects.get_current(request)
    all_sites = Site.objects.all().order_by('name')

    data['sites'] = {
        'all': all_sites,
        'current': current_site,
    }

    data['site_settings'] = Settings.get_current_site_settings(request)

    return data
