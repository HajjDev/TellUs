from flask import Flask, render_template
import os
from .blueprints import login
from . import database

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = '2@CJIZD9081',
        DATABASE = os.path.join(app.instance_path, 'flights.sqlite')
    )

    if test_config is None:
        # Charge l'instant, si elle n'existe pas, ne charge pas
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Charge si elle existe
        app.config.from_mapping(test_config)

    # Regarde si le fichier existe bien
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Charge la base de données
    database.innit_app(app)
    
    app.register_blueprint(login.bp)
    
    @app.route('/')
    def signupin():
        return render_template('index.html')

    return app
