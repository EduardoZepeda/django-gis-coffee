from django.views.generic import ListView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from .models import Action


@method_decorator(login_required, name="dispatch")
class FeedList(ListView):
    model = Action
    template_name = "feeds/timeline.html"
    context_object_name = "feed"

    def get_queryset(self):
        # Display all actions by default
        actions = Action.objects.exclude(user=self.request.user)
        following_ids = self.request.user.following.values_list("id", flat=True)
        if following_ids:
            # If user is following others, retrieve only their actions
            actions = (
                actions.filter(user_id__in=following_ids)
                .select_related("user")
                .prefetch_related("target")
            )
            actions = actions
        return actions[:10]
