from django.conf import settings

import graphene
from graphene_django.debug import DjangoDebug

from user.schema import UserQuery, UserMutation
from university.schema import UniversityQuery
from instructor.schema import InstructorQuery
class Query(UserQuery, UniversityQuery, InstructorQuery, graphene.ObjectType):
     if settings.DEBUG:
        debug = graphene.Field(DjangoDebug, name='__debug')

class Mutation(UserMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)