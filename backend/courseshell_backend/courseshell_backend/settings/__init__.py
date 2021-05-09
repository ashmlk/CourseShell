import os
from .common import *
from decouple import config

environment = config('DEV_ENV', cast=str)

if environment == "dev":
    from .dev import *
elif environment == "staging":
    from .staging import *
elif environment == "prod":
    from .prod import *