from django.views.generic import TemplateView

from main import models


class IndexPageView(TemplateView):
    template_name = 'main/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = models.Product.objects.filter(show_on_index=True)
        context['comments'] = models.Comment.objects.filter(active=True)
        return context
