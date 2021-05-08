def create_username(email):
    
    rand = random.getrandbits(64)
    username = '%s%s' % (email, rand)
    return username