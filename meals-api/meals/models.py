# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class BaseModel(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name

    class Meta:
        abstract = True

class Ingredient(BaseModel):
    kcals = models.IntegerField()
    carbs = models.IntegerField()
    protein = models.IntegerField()
    fat = models.IntegerField()


class Meal(BaseModel):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="meals")
    ingredients = models.ManyToManyField(Ingredient, through="MealIngredient", related_name="meal")


class MealIngredient(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount_grams = models.IntegerField()

    def __unicode__(self):
        return self.meal.name + " > " + self.ingredient.name