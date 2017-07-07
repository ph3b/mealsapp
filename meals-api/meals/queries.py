import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id
from graphene import relay

from meals.types import IngredientType, MealType
from models import Meal, Ingredient


class Query(graphene.AbstractType):
    all_ingredients = DjangoFilterConnectionField(IngredientType)
    all_meals = graphene.List(MealType)
    ingredient = DjangoFilterConnectionField(IngredientType, id=graphene.Int())
    meal = relay.Node.Field(MealType, id=graphene.Int())

    def resolve_all_meals(self, args, context, info):
        return Meal.objects.filter(owner=context.user)

    def resolve_all_ingredients(self, args, context, info):
        return Ingredient.objects.all()

    def resolve_ingredient(self, args, context, info):
        id = args.get("id")
        if id is not None:
            return Ingredient.objects.get(pk=id)
        return None

    def resolve_meal(self, args, context, info):
        meal_global_id = args.get("id")
        meal_internal_id = from_global_id(meal_global_id)[1]
        meal = Meal.objects.get(pk=meal_internal_id)

        if id is not None:
            meal = Meal.objects.get(pk=id)
            if meal.owner == context.user:
                return meal
            return None
        return None
