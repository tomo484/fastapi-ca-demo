# Build stage
FROM python:3.12-slim 
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY fastapi-app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY fastapi-app/ . 

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]