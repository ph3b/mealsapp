# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 15:35
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0006_auto_20170707_1520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meals', to=settings.AUTH_USER_MODEL),
        ),
    ]