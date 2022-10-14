from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views.generic import CreateView, DetailView, ListView
from shops.models import Shop
from django.utils.decorators import method_decorator

from .models import Review
from feeds.utils import create_action

@method_decorator(login_required, name="dispatch")
class CreateCoffeeShopReview(CreateView):
    model = Review
    fields = ["content", "recommended"]
    template_name = "reviews/create_review.html"

    def form_valid(self, form):
        review = form.save(commit=False)
        review.user = self.request.user
        shop = get_object_or_404(Shop, pk=self.kwargs["coffee_shop_id"])
        review.shop = shop
        review.save()
        create_action(self.request.user, "reviewed", shop)
        return super().form_valid(form)

@method_decorator(login_required, name="dispatch")
class ReadCoffeeShopReview(DetailView):
    model = Review
    template_name = "reviews/read_review.html"
    context_object_name = "review"

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.select_related("shop")

@method_decorator(login_required, name="dispatch")
class ReadCoffeeShopReviewList(ListView):
    model = Review
    template_name = "reviews/read_reviews_by_shop.html"
    context_object_name = "reviews"
    paginate_by = 20

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.select_related("shop").select_related("user")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["shop"] = Shop.objects.get(pk=self.kwargs.get("coffee_shop_id"))
        return context