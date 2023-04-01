import datetime
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from .models import Action
from django.conf import settings


def create_action(user, user_action, target=None):
    """Create an action for account's feed. Prevent action spam limiting similar actions in a certain period of time"""
    now = timezone.now()
    last_minute = now - datetime.timedelta(
        seconds=settings.SECONDS_TO_TRACK_REPEATING_ACTIONS
    )
    similar_actions = Action.objects.filter(
        user_id=user.id, action=user_action, created__gte=last_minute
    )
    if target:
        # Retreive the ContentType from django's ContentType system
        target_ct = ContentType.objects.get_for_model(target)
        similar_actions = similar_actions.filter(
            target_ct=target_ct, target_id=target.id
        )
    if not similar_actions:
        action = Action(user=user, action=user_action, target=target)
        action.save()
        return True
    return False
