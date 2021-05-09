from django.test import TestCase
from user.models import User

class UserTestCase(TestCase):
    
    obj1 = obj2 = obj3 = obj4 = None

    def setUp(self):
        self.obj1 = User.objects.create(first_name="james", last_name="adams", email="jamesadams@gmail.com")
        self.obj2 = User.objects.create(first_name="bobby", last_name="joe", email="bobbyjoe.78@gmail.com")
        self.obj3 = User.objects.create(first_name="amy", last_name="lucas", email="12amy_123jackson@hotmail.com", username="amy123234")
        self.obj4 = User.objects.create(first_name="dane", last_name="alexander", email="dane_32@hotmail.com", username="DanEAleXanDer")

    def test_user_has_username(self):
        """ Users will have username on creation if username was empty """
        james = User.objects.get(first_name="james", last_name="adams", email="jamesadams@gmail.com")
        bobby = User.objects.get(first_name="bobby", last_name="joe", email="bobbyjoe.78@gmail.com")
        self.assertTrue(len(james.get_username()) > 0)
        self.assertTrue(len(bobby.get_username()) > 0)

    def test_user_empty_username_unique_after_signals(self):
        """ Users will have unique usernames even their usernames were set to NULL pre_save """
        james = User.objects.get(first_name="james", last_name="adams", email="jamesadams@gmail.com")
        bobby = User.objects.get(first_name="bobby", last_name="joe", email="bobbyjoe.78@gmail.com")
        self.assertTrue(james.get_username() != bobby.get_username())   
        
    def test_user_has_lowercase_username(self):
        """ Check if user's username is always set to lowercase """
        self.assertTrue(self.obj4.get_username().islower())
        
    def test_user_has_email(self):
        """ Users should always have email """
        james = User.objects.get(first_name="james", last_name="adams", email="jamesadams@gmail.com")
        amy = User.objects.get(first_name="amy", last_name="lucas", email="12amy_123jackson@hotmail.com")
        self.assertTrue(len(james.email) > 1)
        self.assertTrue(len(amy.email) > 1)
