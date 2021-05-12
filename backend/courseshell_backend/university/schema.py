import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import University
import django_filters


class UniversityType(DjangoObjectType):
    
    student_count = graphene.Int()
    course_count = graphene.Int()
    
    class Meta: 
        model = University
        interfaces = (graphene.relay.Node,)
        exclude = ['id']
        filter_fields = {
            'uuid': ['exact'],
            'name': ['exact', 'icontains', 'istartswith'],
            'country': ['exact', 'icontains', 'istartswith'],
            'state': ['exact', 'icontains', 'istartswith'],
            'city': ['exact', 'icontains', 'istartswith'],
        }

    def resolve_student_count(self, info, **kwargs):
        return self.students.count()

    def resolve_course_count(self, info, **kwargs):
        return self.courses.count()
        
class UniversityQuery(graphene.ObjectType):
    all_universities = DjangoFilterConnectionField(UniversityType)
    university = graphene.Field(UniversityType, university_uuid=graphene.String())
    
    def resolve_all_universities(self, info, **kwargs):
        return University.objects.all()
    
    def resolve_university(self, info, university_uuid):
        return University.object.get(uuid=university_uuid)
    

