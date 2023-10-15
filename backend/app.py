from flask import Flask, request, session, Response, jsonify
from flask_session import Session
import psycopg2
from argon2 import PasswordHasher
from datetime import date, timedelta
from pipeline.pipeline import run_pipeline
import base64

from flask.sessions import SecureCookieSessionInterface


app = Flask(__name__)

session_cookie = SecureCookieSessionInterface().get_signing_serializer(app)


app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SESSION_COOKIE_SAMESITE'] = "None"
app.config['SESSION_COOKIE_SECURE'] = True
Session(app)

conn = psycopg2.connect(database = "eylwyufz",
                        host = "suleiman.db.elephantsql.com",
                        user = "eylwyufz",
                        password = "mJj9OEnuJW89gt2BaBdbQhxz4600y2vJ")
cur = conn.cursor()

ph = PasswordHasher()

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        res.headers['Access-Control-Allow-Headers'] = 'content-type'
        res.headers['Access-Control-Allow-Methods'] = '*'
        res.headers.set("Access-Control-Allow-Credentials", "true")
        return res

@app.after_request
def add_cors(response):
    if request.method != "OPTIONS":
        response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.set("Access-Control-Allow-Credentials", "true")
        response.headers.set("X-Content-Type-Options", "*")
    
    return response

@app.route("/")
def index():
    return "app"

@app.post("/login")
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    cur.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cur.fetchone()
    if not user:
        return jsonify({"status": "user does not exist"}), 401
    try:
        ph.verify(user[1], password)
    except:
        return jsonify({"status": "password incorrect"}), 401
    else:
        session["name"] = username
        return {"status": "login successful"}

@app.get("/authcheck")
def authcheck():
    if session.get("name") == None:
        return {"status":"failed"}, 403
    return {"status":"ok"}

@app.post("/register")
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']
    cur.execute("SELECT * FROM users WHERE username=%s", (username,))
    existing_user = cur.fetchone()
    if (existing_user):
        return jsonify({"error": "user already exists"}), 400

    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                (username, ph.hash(password)))
    
    session["name"] = username

    return {}

@app.post("/new_entry")
def new_entry():
    if (session.get("name") == None):
        response = jsonify({"error":"need to log in"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response, 403

    mood = request.get_json()['mood']
    entry = request.get_json()['entry']
    cur.execute("INSERT INTO entries (username, date, mood, entry) VALUES (%s, %s, %s, %s)",
                (session.get("name"), date.today(), mood, entry,))
    print(date.today())
    print(run_pipeline(entry))
    cur.execute("""
                UPDATE entries 
                SET picture=%s
                WHERE username=%s AND date=%s
                """,
                (run_pipeline(entry), session.get("name"), date.today()))
    """
    try:
        cur.execute("INSERT INTO entries (image) VALUES (%s)",
                    (run_pipeline(entry),))
    except:
        print("Failed to generate image")
        response = jsonify({"error": "failed to generate image"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        # cur.execute("ROLLBACK")
        return response, 404
    """
    
    # cur.commit()
    return {}

@app.post("/get_entry")
def get_entry():
    if (session.get("name") == None):
        response = jsonify({"error":"need to log in"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response, 403

    date = request.get_json()['date']
    print(date)
    cur.execute("SELECT date, mood, entry, picture FROM entries WHERE username=%s AND date=%s", (session.get("name"), date))
    # print(cur.fetchone())
    res = cur.fetchone()
    if not res:
        return {"result": "no entry found"}
    print(res)
    reslist = list(res)
    reslist[3] = reslist[3].tobytes()
    reslist[3] = base64.b64encode(reslist[3]).decode("utf-8")
    print(reslist)


    return {"result":reslist}


@app.post("/get_calendar")
def get_calendar():
    if (session.get("name") == None):
        response = jsonify({"error":"need to log in"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return response, 403
    
    today = date.fromisoformat(request.get_json()['date'])
    if not today:
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

    return {"results":moods}

app.run("0.0.0.0", 5000)
