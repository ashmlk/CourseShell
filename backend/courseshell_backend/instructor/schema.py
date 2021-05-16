import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import Instructor
import django_filters

class InstructorType(DjangoObjectType):
    
    full_name = graphene.String()
    student_count = graphene.Int()
    courses_count = graphene.Int()
    
    class Meta: 
        model = Instructor
        interfaces = (graphene.relay.Node,)
        exclude = ['id']
        filter_fields = {
            'first_name': ['exact', 'icontains','istartswith'],
            'last_name': ['exact', 'icontains','istartswith'],
            'university__name': ['exact', 'icontains','istartswith'],
            'courses__code': ['exact', 'icontains','istartswith']
        }
        
    def resolve_full_name(self, info, **kwargs):
        return '%s %s' % (self.first_name, self.last_name)
    
    def resolve_student_count(self, info, **kwargs):
        return self.students.count()

    def resolve_course_count(self, info, **kwargs):
        return self.courses.count()
        
        
class InstructorQuery(graphene.ObjectType):
    instructors = DjangoFilterConnectionField(InstructorType)
    instructor = graphene.Field(InstructorType, instructor_uuid=graphene.String())
    
    def resolve_all_instructors(self, info, **kwargs):
        return Instructor.objects.all()
    
    def resolve_instructor(self, info, instructor_uuid):
        return Instructor.object.get(uuid=instructor_uuid)
    

