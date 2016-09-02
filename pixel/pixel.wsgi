import os, sys
sys.path = [os.path.dirname(__file__)] + sys.path
os.chdir(os.path.dirname(__file__))

import bottle
import pixel

application = bottle.default_app()

