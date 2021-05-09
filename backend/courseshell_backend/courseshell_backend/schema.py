from django.conf import settings

import graphene
from graphene_django.debug import DjangoDebug

from user.schema import UserQuery, UserMutation
class Query(UserQuery, graphene.ObjectType):
     if settings.DEBUG:
        debug = graphene.Field(DjangoDebug, name='__debug')

class Mutation(UserMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)