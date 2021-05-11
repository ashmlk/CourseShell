import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import User
import django_filters
        
class UserType(DjangoObjectType): 
    class Meta:
        model = User
        interfaces = (graphene.relay.Node,)
        fields = '__all__'
        filter_fields = {
            'username': ['exact','icontains', 'istartswith'],
            'first_name': ['exact','icontains', 'istartswith'],
            'last_name':['exact','icontains', 'istartswith'],
            'uuid':['exact'],
            'university__name':['exact','icontains','istartswith'],          
        }

class UserQuery(graphene.ObjectType):
    all_users = DjangoFilterConnectionField(UserType)
    user = graphene.Field(UserType, user_uuid=graphene.String())

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_user(self, info, user_uuid):
        return User.objects.get(uuid=user_uuid)
    
class UserInput(graphene.InputObjectType):
    first_name = graphene.String()
    last_name = graphene.String() 
    username = graphene.String()
    email = graphene.String()
    
class CreateUser(graphene.Mutation):
    class Arguments:
        user_data = UserInput(required = True)
        
    user = graphene.Field(UserType)
    
    @staticmethod
    def mutate(root, info, user_data=None):
        user_instance = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            username=user_data.username
        )
        
        user_instance.save()
        return CreateUser(user=user_instance)
    
class UpdateUser(graphene.Mutation):
    class Arguments:
        user_data = UserInput(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, user_data=None):

        user_instance = User.objects.get(uuid=user_data.uuid)

        if user_instance:
            user_instance.first_name=user_data.first_name,
            user_instance.last_name=user_data.last_name,
            user_instance.email=user_data.email,
            user_instance.username=user_data.username
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
        user_instance.delete()

        return None
    
class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    delete_user = DeleteUser.Field()


schema = graphene.Schema(query=UserQuery, mutation=UserMutation)