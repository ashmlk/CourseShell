import os
from .common import *

environment = os.environ.get("DEV_ENV")

if environment == True: #assuming value of DEV_ENV is 'development'
    from .dev import *
else:
    from .prod import *