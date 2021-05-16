import graphene
from graphene_django import DjangoObjectType, DjangoListField
from graphene_django.filter import DjangoFilterConnectionField
from .models import Course, Review
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
    courses = DjangoFilterConnectionField(CourseType)
    course = graphene.Field(CourseType, course_uuid=graphene.String())
    
    def resolve_courses(self, info, **kwargs):
        return Course.objects.all()
    
    def resolve_course(self, info, course_uuid):
        return Course.object.get(uuid=course_uuid)
    

class ReviewType(DjangoObjectType):
    
    like_count = graphene.Int()
    dislike_count = graphene.Int()
    
    class Meta:
        model = Review
        interfaces = (graphene.relay.Node,)
        exclude = ['id']
        filter_fields =  {
             'uuid': ['exact'],
             'course__code': ['exact', 'icontains','istartswith'],
             'course__university__name': ['exact', 'icontains','istartswith'],
             'author__username': ['exact', 'icontains','istartswith'],      
        }
        
    def resolve_like_count(self, info, **kwargs):
        return self.likes.count()
    
    def resolve_dislike_count(self, info, **kwargs):
        return self.dislikes.count()
    
class ReviewQuery(graphene.ObjectType):
    reviews = DjangoFilterConnectionField(ReviewType)
    review = graphene.Field(ReviewType, review_uuid=graphene.String())
    
    def resolve_reviews(self, info, **kwargs):
        return Review.objects.all()
    
    def resolve_review(self, info, review_uuid):
        return Review.objects.get(uuid=review_uuid)
    
    
class ReviewInput(graphene.InputObjectType):
    content = graphene.String(required=True)
    author_uuid = graphene.String(required=True)
    course_uuid = graphene.String(required=True)
    
class CreateReview(graphene.Mutation):
    class Arguments:
        data = ReviewInput(required=True)
    
    review = graphene.Field(ReviewType)
    
    @staticmethod
    def mutate(root, info, data=None):
        course = Course.objects.get(uuid=data.course_uuid)
        author = User.objects.get(uuid=data.author_uuid)
        if author and course:       
            review_instance = Review.objects.create(
                course=course,
                author=author,
                content=data.content
            )
            return CreateReview(review=review_instance)
        return CreateReview(review=None)

class UpdateReview(graphene.Mutation):
    class Arguments:
        data = ReviewInput(required=True)
    
    review = graphene.Field(ReviewType)
    
    @staticmethod
    def mutate(root, info, **kwargs):
        review_instance = Review.objects.get(uuid=data.uuid)
        
        if review_instance:
            review_instance.content=data.content
            
            return UpdateReview(review=review_instance)
        return UpdateReview(review=None)
    
class DeleteReview(graphene.Mutation):
    
    class Arguments:
        uuid = graphene.String() 
    
    review = graphene.Field(ReviewType)
    
    @staticmethod
    def mutate(root, info, uuid):
        review_instance = Review.objects.get(uuid=uuid)
        if review_instance:
            review_instance.delete()
        return None
    
class ReviewMutation(graphene.ObjectType):
    create_review = CreateReview.Field()
    update_review = UpdateReview.Field()
    delete_review = DeleteReview.Field()
    
    
    
    
    
        
    
    

    
    
    

