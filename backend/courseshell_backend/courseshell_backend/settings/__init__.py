import os
from .common import *

environment = os.environ.get("DEV_ENV")

if environment == "dev": #assuming value of DEV_ENV is 'development'
    from .dev import *
elif environment == "staging":
    from .staging import *
elif environment == "prod":
    from .prod import *