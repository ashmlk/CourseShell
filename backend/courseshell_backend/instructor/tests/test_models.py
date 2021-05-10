from django.test import TestCase
from instructor.models import Instructor

class InstructorTestCase(TestCase):
    
    obj1 = obj2 = None

    def setUp(self):
        self.obj1 = Instructor.objects.create(first_name="aLeX", last_name="JaMson")
        self.obj2 = Instructor.objects.create(first_name=" leXi    ", last_name=" grahamSONs")
    
    def test_first_name_is_lower(self):
        """ Test of instructor first name is always set to lowercase """
        self.assertTrue(self.obj1.first_name.islower())
        self.assertTrue(self.obj2.first_name.islower())
        
    def test_last_name_is_lower(self):
        """ Test if instructor last name is always set to lowercase """
        self.assertTrue(self.obj1.last_name.islower())
        self.assertTrue(self.obj2.last_name.islower())
        
    def test_slug_field_is_created(self):
        """ Test if instructor slug field is created properly """
        self.assertEquals(self.obj1.slug, 'alex-jamson')
        self.assertEquals(self.obj2.slug, 'lexi-grahamsons')


