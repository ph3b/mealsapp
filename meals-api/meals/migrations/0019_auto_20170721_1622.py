# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-21 14:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0018_auto_20170721_1620'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='kind',
            field=models.CharField(blank=True, choices=[('Breakfast', 'Breakfast'), ('Lunch', 'Lunch'), ('Dinner', 'Dinner'), ('Snack', 'Snack'), ('Supplement', 'Supplement'), ('Dessert', 'Dessert')], max_length=100, null=True),
        ),
    ]