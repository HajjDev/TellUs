from flask_wtf import Flaskform
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
from src.models  import User

class RegistrationForm(FlaskForm) :
    firstname = StringField('firstname', validator=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email()]) #Email() ensure that the user email repect the email format
    username = StringField('username', validators=[DataRequired()])
    password1 = StringField('password', validators=[DataRequired()])
    password2 = StringField('repeat password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username) :
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')
        
    def validation_email(self, email) :
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email address.')
