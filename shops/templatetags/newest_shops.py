# Use datetime if not localizing timezones
import datetime
# Otherwise use timezone
from django.utils import timezone 

from django.template import Library

register = Library()

@register.filter
def days_ago(creation_date, days):
    return timezone.now() < creation_date + datetime.timedelta(days=days) 
