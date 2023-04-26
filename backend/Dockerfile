# Use the official Python base image
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy requirements.txt to the container and install packages
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Add this line to install the psycopg2 package
RUN pip install psycopg2-binary

# Copy the rest of the application code
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
