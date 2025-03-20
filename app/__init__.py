from flask import Flask, render_template
from .blueprints import login
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import os

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY = '2@CJIZD9081',
)

basedir = os.path.abspath(os.path.join(os.getcwd(), "app"))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'tellus.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


app.register_blueprint(login.bp)

@app.route('/')
def signupin():
    return render_template('index.html')
