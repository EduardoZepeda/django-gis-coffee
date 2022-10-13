from django.shortcuts import redirect


def anonymous_required(redirect_url):
    """
    Redirect to a certain url when the user is logged in.
    This is useful to block register views from logged in users.
    """
    def wrapper(view_func, *args, **kwargs):
        def check_if_user_is_anonymous(request, *args, **kwargs):
            view = view_func(request, *args, **kwargs)
            if request.user.is_authenticated:
                return redirect(redirect_url)
            return view
        return check_if_user_is_anonymous
    return wrapper