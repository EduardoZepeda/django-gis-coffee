from django.contrib.auth import get_user_model

User = get_user_model()

def users_to_follow(request):
    if request.user.is_authenticated:
        users = User.objects.exclude(followers__in=[request.user]).exclude(pk=request.user.pk)[:5]
        return {
            "users_to_follow": users
        }
    return {}