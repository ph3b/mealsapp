# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

mealChoices = (("Breakfast", "Breakfast"), ("Lunch", "Lunch"), ("Dinner", "Dinner"), ("Snack", "Snack"), ("Supplement", "Supplement"), ("Dessert", "Dessert"))

class BaseModel(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name

    class Meta:
        abstract = True


class Ingredient(BaseModel):
    kcal = models.FloatField()
    carbs = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    fiber = models.FloatField()


class Meal(BaseModel):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meals")
    kind = models.CharField(max_length=100, blank=True, null=True, choices=mealChoices)
    ingredients = models.ManyToManyField(Ingredient, through="MealIngredient", related_name="meal")


class MealIngredient(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount_grams = models.FloatField()

    def __unicode__(self):
        return self.meal.name + " > " + self.ingredient.name