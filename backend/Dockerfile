FROM python:3.8-slim

RUN apt-get update && apt install -y libpq-dev gcc

COPY ./ /api
WORKDIR /api

RUN pip3 install -r requirements.txt

CMD ["python3", "-m", "app.py"]