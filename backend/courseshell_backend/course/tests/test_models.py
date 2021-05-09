from django.test import TestCase
from course.models import Course

class CourseTestCase(TestCase):
    
    obj1 = obj2 = None

    def setUp(self):
        self.obj1 = Course.objects.create(code="cPs109")
        self.obj2 = Course.objects.create(code=" MTh100    ")
    
    def test_code_is_upper(self):
        self.assertEquals(self.obj1.code, "CPS109")
    
    def test_code_is_upper_and_has_no_space(self):
        self.assertEquals(self.obj2.code, "MTH100")
        


