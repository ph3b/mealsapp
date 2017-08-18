import graphene
from graphql_relay.node.node import from_global_id

from meals.types import MealType, MealIngredient, IngredientType
from models import Meal, MealIngredient, Ingredient


class IngredientInput(graphene.InputObjectType):
    id = graphene.String()
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
        print(meal_name)
        print(meal_data)
        meal = Meal(name=meal_name, owner=context.user)
        meal.save()
        for ingredient in ingredients:
            id = ingredient.get("id")
            amount = ingredient.get("amount")
            ingredient_internal_id = from_global_id(id)[1]
            ingredient = Ingredient.objects.get(pk=ingredient_internal_id)
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