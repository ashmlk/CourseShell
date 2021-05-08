import random

def create_username(email):
    
    rand = random.getrandbits(32)
    username = '%s%s' % (email, rand)
    return username
