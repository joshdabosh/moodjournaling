from flask import Flask, request, session
from flask_session import Session
import psycopg2
from argon2 import PasswordHasher

app = Flask(__name__)
# SESSION_TYPE = 'filesystem'
# SESSION_PERMANENT = False
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# app.config.from_object(__name__)
# app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
Session(app)

conn = psycopg2.connect(database = "eylwyufz",
                        host = "suleiman.db.elephantsql.com",
                        user = "eylwyufz",
                        password = "mJj9OEnuJW89gt2BaBdbQhxz4600y2vJ")
cur = conn.cursor()

ph = PasswordHasher()

@app.route("/")
def index():
    return "app"

@app.post("/test")
def test():
    print("TEST: SESSION NAME: ", session.get("name"))
    return ""

@app.post("/login")
def login():
    cur.execute("SELECT * FROM users WHERE username=%s", (request.form['username'],))
    user = cur.fetchone()
    print(user)
    if (ph.verify(user[1], request.form['password'])):
        print("success")
        session["name"] = request.form['username']
        print(session.get("name"))
    return ""

@app.post("/register")
def register():
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                (request.form['username'], ph.hash(request.form['password'])))
    cur.execute("SELECT * FROM users")
    print(cur.fetchall())
    return ""

# @app.post("/new_entry")
# def new_entry():
    # cur.execute("INSERT INTO entries (username, )")
app.run("0.0.0.0", 5050)
