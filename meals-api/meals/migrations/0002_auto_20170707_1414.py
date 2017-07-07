# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 12:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('kcals', models.IntegerField()),
                ('carbs', models.IntegerField()),
                ('protein', models.IntegerField()),
                ('fat', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='MealIngredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount_grams', models.IntegerField()),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meals.Ingredient')),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meals.Meal')),
            ],
        ),
        migrations.AddField(
            model_name='meal',
            name='ingredients',
            field=models.ManyToManyField(through='meals.MealIngredient', to='meals.Ingredient'),
        ),
    ]
