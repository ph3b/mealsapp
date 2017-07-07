import graphene
from graphene_django import DjangoObjectType
from graphene import relay

from models import Ingredient, MealIngredient, Meal
from django.contrib.auth.models import User


class IngredientType(DjangoObjectType):
    class Meta:
        model = Ingredient
        filter_fields = {
            "name": ['exact', 'icontains', 'istartswith']
        }
        only_fields = ["name", "id", "kcal", "carbs", "fat", "protein", "fiber"]
        interfaces = (relay.Node,)


class MealIngredientType(DjangoObjectType):
    class Meta:
        model = MealIngredient
        exclude_fields = ["meal"]
        interfaces = (relay.Node,)


class MealType(DjangoObjectType):
    ingredients = graphene.List(MealIngredientType)

    class Meta:
        model = Meal
        only_fields = ["name", "id", "ingredients"]
        interfaces = (relay.Node,)

    @graphene.resolve_only_args
    def resolve_ingredients(self):
        return MealIngredient.objects.filter(meal=self)


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ("password",)
