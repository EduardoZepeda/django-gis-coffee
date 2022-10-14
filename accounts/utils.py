from django.conf import settings

def user_directory_path(instance, filename):  
    return "user_{0}/{1}".format(instance.id, filename)