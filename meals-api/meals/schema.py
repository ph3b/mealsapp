import graphene
from graphene_django import DjangoObjectType
from models import Meal, Ingredient, MealIngredient
from django.contrib.auth.models import User
from graphene import relay, ObjectType, AbstractType
from graphene_django.filter import DjangoFilterConnectionField


class IngredientType(DjangoObjectType):
    class Meta:
        model = Ingredient
        filter_fields = {
            "name": ['exact', 'icontains', 'istartswith']
        }
        interfaces = (relay.Node,)


class MealIngredientType(DjangoObjectType):
    class Meta:
        model = MealIngredient
        interfaces = (relay.Node,)


class MealType(DjangoObjectType):
    ingredients = graphene.List(MealIngredientType)

    class Meta:
        model = Meal
        interfaces = (relay.Node,)

    @graphene.resolve_only_args
    def resolve_ingredients(self):
        return MealIngredient.objects.filter(meal=self)


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ("password",)


class Query(graphene.AbstractType):
    all_meals = graphene.List(MealType)
    all_ingredients = DjangoFilterConnectionField(IngredientType)
    ingredient = DjangoFilterConnectionField(IngredientType, id=graphene.Int())
    meal = relay.Node.Field(MealType, id=graphene.Int())
    me = relay.Node.Field(UserType, username=graphene.String())

    def resolve_me(self, args, context, info):
        username = args.get("username")
        if username is not None:
            return User.objects.filter(username=username)[0]
        return None

    def resolve_all_meals(self, args, context, info):
        return Meal.objects.all()

    def resolve_all_ingredients(self, args, context, info):
        return Ingredient.objects.all()

    def resolve_ingredient(self, args, context, info):
        id = args.get("id")
        if id is not None:
            return Ingredient.objects.get(pk=id)
        return None

    def resolve_meal(self, args, context, info):
        id = args.get("id")
        if id is not None:
            return Meal.objects.get(pk=id)
        return None
