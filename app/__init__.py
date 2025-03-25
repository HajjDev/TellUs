from flask import Flask, render_template
from .blueprints import login
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
 
db = SQLAlchemy()  # Initialize SQLAlchemy
migrate = Migrate()  # Initialize Flask-Migrate

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tellus.db'  # Change this if using another DB
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)  # Attach Flask-Migrate to the app and database

    from app.models import User  # Import the models AFTER db.init_app
    
    @app.route('/') 
    def signupin():
        return render_template('index.html')

    return app
