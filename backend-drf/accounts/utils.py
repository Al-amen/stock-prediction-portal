from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta

def generate_email_verification_token(user):
    """
    Generate a JWT token for email verification
    """
    token = AccessToken.for_user(user)
    token.set_exp(lifetime=timedelta(hours=24))  # valid for 24 hours
    token['email_verification'] = True
    return str(token)
    