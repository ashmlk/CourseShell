from django.db import models

class University(models.Model):
    name = models.CharField(max_length=200,)
    country = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    city = models.CharField(max_length=50, null=True)
    
    def __str__(self):
        return self.name
    
                    
                            
                        
    

