from django.template import Library
from django.utils.safestring import mark_safe

register = Library()

@register.simple_tag()
def render_stars(stars):
    if int(stars) == 0:
        return ''
    full_stars = '<i class="fa-solid fa-star"></i>' * int(stars)
    half_star = '<i class="fa-solid fa-star-half-stroke"></i>' if stars%1==0.5 else ''
    return mark_safe('<div class="rating-container">{}{}</div>'.format(full_stars, half_star))