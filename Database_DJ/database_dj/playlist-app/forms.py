"""Forms for playlist app."""

from wtforms import SelectField, SelectField, StringField, TextAreaField, validators
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField('Name', validators=[validators.DataRequired()])
    description = TextAreaField('Description')


class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField('Title', validators=[validators.DataRequired()])
    artist = StringField('Artist', validators=[validators.DataRequired()])

    


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

# returns TypeError: int() argument must be a string, a bytes-like object or a real number, not 'Row'
    song = SelectField('Song To Add', coerce=int)

 # songs show up with this code, but need to be an int to be added...not sure where I'm going wrong here
    # song = SelectField('Song To Add', validators=[validators.InputRequired()])
