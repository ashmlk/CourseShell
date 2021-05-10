from django.test import TestCase
from university.models import University

class UniversityTestCase(TestCase):
    
    obj1 = None

    def setUp(self):
        self.obj1 = University.objects.create(name="Ryerson University    ")
        
    def test_university_has_slug(self):
        self.assertEquals(self.obj1.slug, 'ryerson-university')
    
    
    

