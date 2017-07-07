# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework.authtoken.models import Token
import json


@api_view(["POST"])
def register(request):
    try:
        username = request.data["username"]
        password = request.data["password"]

        user = User.objects.create_user(username=username, email=None, password=password)
        token = Token.objects.create(user=user)
        return Response(json.dumps({"token": token.key, "message": "Created"}), status=status.HTTP_201_CREATED)

    except IntegrityError:
        return Response("Username already in use", status=status.HTTP_200_OK)