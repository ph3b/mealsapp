# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


@api_view(["POST"])
def login(request):
    print request.data
    # Get username and password and return token
    return Response("hei", status=status.HTTP_200_OK)


@api_view(["POST"])
def register(request):
    print request.data
    # Register username and password and return token
    return Response("hei", status=status.HTTP_200_OK)
