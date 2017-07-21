from django.conf.urls import url
from django.contrib import admin
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from django.contrib.auth.mixins import LoginRequiredMixin


from .schema import schema
from meals.views import register

def graphql_token_view():
    view = GraphQLView.as_view(schema=schema)
    view = permission_classes((IsAuthenticated,))(view)
    view = authentication_classes((TokenAuthentication,))(view)
    view = api_view(['POST'])(view)
    return view

class PrivateGraphQLView(LoginRequiredMixin, GraphQLView):
    pass

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^graphql', graphql_token_view()),
    url(r'^graphiql', PrivateGraphQLView.as_view(graphiql=True, schema=schema)),
    url(r'^register', register),
    url(r'^login', views.obtain_auth_token)
]
