# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from models import Ingredient, Meal, MealIngredient

from django.contrib import admin

admin.site.register(Meal)
admin.site.register(Ingredient)
admin.site.register(MealIngredient)


