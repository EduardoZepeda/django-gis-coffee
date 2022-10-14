from django.generic.views import CreateView

from .models import Review


class ReviewForm(CreateView):
    model = Review

    def form_valid(self, form):
        object = form.save(commit=False)
        object.owner = self.request.user
        object.save()
        return super().form_valid(form)
