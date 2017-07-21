# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-21 13:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0015_auto_20170721_1550'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='type',
            field=models.CharField(blank=True, choices=[(0, 'Breakfast'), (1, 'Lunch'), (2, 'Dinner'), (3, 'Snack'), (4, 'Supplement'), (5, 'Dessert')], max_length=100, null=True),
        ),
    ]
