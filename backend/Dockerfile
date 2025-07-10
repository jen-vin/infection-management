FROM python:3.11-slim

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

WORKDIR /app

COPY ./app /app
COPY ./alembic /app/alembic
COPY alembic.ini /app/alembic.ini
COPY requirements.txt /app/requirements.txt
COPY start.sh /app/start.sh

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

ENV PYTHONPATH=/app

# Make sure the script is executable
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
