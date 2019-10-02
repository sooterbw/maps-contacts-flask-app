from flask import Flask, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Patron(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    address = db.Column(db.String(200))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(100))

@app.route('/', methods=["GET", "POST"])
def index():
    if request.form:
        try:
            patron = Patron(
                name=request.form.get("name"),
                address=request.form.get("address"),
                email=request.form.get("email"),
                phone=request.form.get("phone"))
            db.session.add(patron)
            db.session.commit()
        except Exception as e:
            print("Failed to add patron")
            print(e)
    patrons = Patron.query.all()
    return render_template('events.html', patrons=patrons)

@app.route("/delete", methods=["POST"])
def delete():
    name = request.form.get("name")
    patron = Patron.query.filter_by(name=name).first()
    db.session.delete(patron)
    db.session.commit()
    return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)