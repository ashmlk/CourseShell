import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import User
from university.models import University
import django_filters
        
class UserType(DjangoObjectType): 
    
    full_name = graphene.String()
    course_count = graphene.Int()
    review_count = graphene.Int()
    class Meta:
        model = User
        interfaces = (graphene.relay.Node,)
        exclude =['id','password']
        filter_fields = {
            'uuid':['exact'],
            'username': ['exact','icontains', 'istartswith'],
            'first_name': ['exact','icontains', 'istartswith'],
            'last_name':['exact','icontains', 'istartswith'],
            'university__name':['exact','icontains','istartswith'],
            'university__country': ['exact', 'icontains', 'istartswith'], 
            'courses__code': ['exact', 'icontains', 'istartswith']         
        }
    
    def resolve_full_name(self, info, **kwargs):
        return '%s %s' % (self.first_name, self.last_name)
    
    def resolve_course_count(self, info, **kwargs):
        return self.courses.count()
    
    def resolve_review_count(self, info, **kwargs):
        return self.reviews.count()


class UserQuery(graphene.ObjectType):
    users = DjangoFilterConnectionField(UserType)
    user = graphene.Field(UserType, user_uuid=graphene.String())

    def resolve_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_user(self, info, user_uuid):
        return User.objects.get(uuid=user_uuid)

class UserInput(graphene.InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String() 
    username = graphene.String(required=True)
    email = graphene.String(required=True)
    
class CreateUser(graphene.Mutation):
    class Arguments:
        data = UserInput(required = True)
        
    user = graphene.Field(UserType)
    
    @staticmethod
    def mutate(root, info, data=None):
        user_instance = User.objects.create(
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            username=data.username
        )
        return CreateUser(user=user_instance)
    
class UpdateUser(graphene.Mutation):
    class Arguments:
        data = UserInput(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, data=None):

        user_instance = User.objects.get(uuid=data.uuid)

        if user_instance:
            user_instance.first_name=data.first_name,
            user_instance.last_name=data.last_name,
            user_instance.email=data.email,
            user_instance.username=data.username
            user_instance.save()

            return UpdateUser(user=user_instance)
        return UpdateUser(user=None)
    
    
class DeleteUser(graphene.Mutation):
    class Arguments:
        uuid = graphene.String()

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, uuid):
        user_instance = User.objects.get(uuid=uuid)
        if user_instance:
            user_instance.delete()
        return None
    
class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()
