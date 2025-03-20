import sqlite3
from flask import current_app, g

def get_db():
    """
    This function lets us connect with the database using sqlite3. If the connection is not established
    it will create it.
    
    Returns:
        db: The connection for the database is made to be able to use SQL functions.
    """
    
    if "db" not in g:
        g.db = sqlite3.connect(current_app.config['DATABASE'], detect_types=sqlite3.PARSE_DECLTYPES)
        g.db.row_factory = sqlite3.Row
        
    return g.db

def close_db(e = None):
    """
    This function will let us close the database.
    The argument e is not used in the function.
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()

def innit_app(app):
    """
    To be called when the app is created.
    
    This function will let us close the data base when the app is shutdown.
    """
    app.teardown_appcontext(close_db)