from flask import Flask, request, session
from flask_session import Session
import psycopg2
from argon2 import PasswordHasher
from datetime import date, timedelta

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
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
    return ""

@app.post("/new_entry")
def new_entry():
    cur.execute("INSERT INTO entries (username, date, mood, entry) VALUES (%s, %s, %s, %s)",
                (session.get("name"), date.today(), int(request.form['mood']), request.form['entry'],))
    print("successfully inserted ", session.get("name"), date.today(), int(request.form['mood']), request.form['entry'])
    return ""

@app.post("/get_entry")
def get_entry():
    cur.execute("SELECT * FROM entries WHERE username=%s AND date=%s", (session.get("name"), request.form['date']))
    return cur.fetchone()


@app.post("/get_calendar")
def get_calendar():
    today = date.today()
    this_month_first_day = today.replace(day=1)
    this_month_last_day = today.replace(day=1, month=this_month_first_day.month+1) - timedelta(days=1)
    print("DATES:", this_month_first_day, this_month_last_day)
    first_day = this_month_first_day - timedelta(days = (this_month_first_day.weekday() + 1) % 7)
    last_day = this_month_last_day - timedelta(days = (this_month_last_day.weekday() + 1) % 7) + timedelta(days = 6)
    print("FIRST DAY:", first_day)
    print("LAST DAY:", last_day)
    cur.execute("SELECT date, mood FROM entries WHERE username=%s AND date BETWEEN %s AND %s",
                (session.get("name"), first_day, last_day))
    result = cur.fetchall()
    print(result)
    moods = [None] * 35
    for x in result:
        print((x[0] - first_day).days)
        moods[(x[0] - first_day).days] = x
    return moods

app.run("0.0.0.0", 5050)
