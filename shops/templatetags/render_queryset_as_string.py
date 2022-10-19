from django.template import Library

register = Library()


@register.filter
def render_queryset_as_string(queryset, attr=None):
    query_list = []
    for param in queryset:
        query_list.append(getattr(param, attr) if attr else str(param))
    return ", ".join(query_list)
