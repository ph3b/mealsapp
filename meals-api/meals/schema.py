import graphene
from graphene_django import DjangoObjectType
from models import Meal, Ingredient, MealIngredient
from django.contrib.auth.models import User
from graphene import relay, ObjectType, AbstractType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import from_global_id


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


class IngredientInput(graphene.InputObjectType):
    id = graphene.Int()
    amount = graphene.Float()


class MealInputCreate(graphene.InputObjectType):
    name = graphene.String()
    ingredients = graphene.List(IngredientInput)


class MealInputUpdate(graphene.InputObjectType):
    name = graphene.String()
    id = graphene.String()
    ingredients = graphene.List(IngredientInput)


class CreateMeal(graphene.Mutation):
    class Input:
        meal_data = graphene.Argument(MealInputCreate)

    ok = graphene.Boolean()
    meal = graphene.Field(lambda: MealType)

    @staticmethod
    def mutate(root, args, context, info):
        meal_data = args.get("meal_data")
        meal_name = meal_data.get("name")
        ingredients = meal_data.get("ingredients")

        meal = Meal(name=meal_name, owner=context.user)
        meal.save()
        for ingredient in ingredients:
            id = ingredient.get("id")
            amount = ingredient.get("amount")
            ingredient = Ingredient.objects.get(pk=id)
            meal_ingredients = MealIngredient(meal=meal, ingredient=ingredient, amount_grams=amount)
            meal_ingredients.save()

        ok = True
        return CreateMeal(ok=ok, meal=meal)


class UpdateMeal(graphene.Mutation):
    class Input:
        meal_data = graphene.Argument(MealInputUpdate)

    ok = graphene.Boolean()
    meal = graphene.Field(lambda: MealType)

    @staticmethod
    def mutate(root, args, context, info):
        meal_data = args.get("meal_data")
        meal_name = meal_data.get("name")
        meal_id = meal_data.get("id")
        meal_ingredients = meal_data.get("ingredients")
        meal_internal_id = from_global_id(meal_id)[1]
        meal = Meal.objects.get(pk=meal_internal_id)

        # Check that user owns this meal
        if meal.owner != context.user:
            return None

        if meal_name is not None:
            meal.name = meal_name
        meal.save()

        # Should probably diff this, but okay for now.
        MealIngredient.objects.filter(meal=meal).delete()

        if meal_ingredients is not None:
            for ingredient in meal_ingredients:
                id = ingredient.get("id")
                amount = ingredient.get("amount")
                ingredient = Ingredient.objects.get(pk=id)
                meal_ingredients = MealIngredient(meal=meal, ingredient=ingredient, amount_grams=amount)
                meal_ingredients.save()

        ok = True
        return UpdateMeal(ok=ok, meal=meal)


class Mutations(graphene.ObjectType):
    create_meal = CreateMeal.Field()
    update_meal = UpdateMeal.Field()


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
