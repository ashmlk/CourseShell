import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import Course
import django_filters

class CourseType(DjangoObjectType):

    student_count = graphene.Int()
    instructor_count = graphene.Int()

    class Meta: 
        model = Course
        interfaces = (graphene.relay.Node,)
        exclude = ['id']
        filter_fields = {
          'uuid': ['exact'],
          'code': ['exact', 'icontains','istartswith'],
          'university__name': ['exact', 'icontains', 'istartswith'],
          'university__country': ['exact', 'icontains', 'istartswith']
        }
    
    def resolve_student_count(self, info, **kwargs):
        return self.students.count()

    def resolve_instructor_count(self, info, **kwargs):
        return self.instructors.count()
        
class CourseQuery(graphene.ObjectType):
    all_courses = DjangoFilterConnectionField(CourseType)
    course = graphene.Field(CourseType, course_uuid=graphene.String())
    
    def resolve_all_courses(self, info, **kwargs):
        return Course.objects.all()
    
    def resolve_course(self, info, Course_uuid):
        return Course.object.get(uuid=Course_uuid)
    

