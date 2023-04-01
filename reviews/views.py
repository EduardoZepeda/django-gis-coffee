from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import models
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.generic import CreateView, DetailView, ListView

from feeds.utils import create_action
from shops.models import Shop

from .models import Review


@method_decorator(login_required, name="dispatch")
class CreateCoffeeShopReview(CreateView):
    model = Review
    fields = ["content", "recommended"]
    template_name = "reviews/create_review.html"

    def get_success_url(self):
        # Obtain the shop id directly from the created review
        return reverse_lazy(
            "reviews:list", kwargs={"coffee_shop_id": self.object.shop.pk}
        )

    def form_valid(self, form):
        review = form.save(commit=False)
        review.user = self.request.user
        shop = get_object_or_404(Shop, pk=self.kwargs["coffee_shop_id"])
        is_duplicated = Review.objects.filter(
            user=self.request.user, shop=shop
        ).exists()
        if is_duplicated:
            form.add_error(None, "You already left a a review for this coffee shop")
            return super().form_invalid(form)
        review.shop = shop
        review.save()
        create_action(self.request.user, "reviewed", shop)
        messages.add_message(
            self.request, messages.SUCCESS, _("Your review was created")
        )
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
        return (
            queryset.filter(shop_id=self.kwargs["coffee_shop_id"])
            .select_related("shop")
            .select_related("user")
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["shop"] = Shop.objects.get(pk=self.kwargs.get("coffee_shop_id"))
        return context
