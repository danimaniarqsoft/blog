---
title: "Getting starter with Apache Airflow"
meta_title: "Getting starter with Apache Airflow"
description: "Getting starter with Apache Airflow"
date: 2025-08-01T01:27:41-06:00
image: "/images/posts/data-science/apache-airflow.jpeg"
categories: ["Artificial Intelligence","Data Science"]
author: "Daniel Pichardo"
tags: ["data-science", "tools"]
draft: false
---

# Introduction
Setting up Apache Airflow with Docker is the recommended and easiest way to get started, especially for local development. Docker isolates Airflow and its dependencies in containers, preventing conflicts with your host machine and ensuring a reproducible environment.

Here is a step-by-step guide, including a "Hello World" project to verify that everything is working correctly.

## Prerequisites

1. **Docker Desktop:** Install Docker Desktop on your system (Windows, macOS, or Linux). Ensure it's running and allocate at least 4 GB of memory in the Docker settings (8 GB is ideal to avoid webserver restarts).    
2. **Docker Compose:** Docker Compose is included in recent versions of Docker Desktop. You can verify the installation by running `docker compose version` in your terminal.
3. **Terminal/Command Line:** You will need a terminal to execute commands.
    

## Step-by-Step Guide
### Step 1: Set Up the Project Directory
Create a folder for your Airflow project. This folder will contain all the necessary files.

```shell
mkdir airflow-docker
cd airflow-docker
```

Inside this folder, create the subfolders that Airflow needs to function:

```shell
mkdir -p ./dags ./logs ./plugins
```

- `dags/`: This is where you will place your Python DAG files.    
- `logs/`: Airflow will store task execution logs here.
- `plugins/`: If you have any custom plugins or code, they will go in this folder.
    

### Step 2: Download the `docker-compose.yaml` File

The Airflow team provides an official `docker-compose.yaml` file that sets up all the required services (webserver, scheduler, database, etc.).

Download the file directly into your newly created folder. You can use `curl` or simply go to the URL and save the content into a file named `docker-compose.yaml`.


```shell
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/stable/docker-compose.yaml'
```

**Note:** The URL above always points to the latest stable version.

### Step 3: Configure the User Environment

Airflow in Docker needs to know your user ID (`UID`) to avoid permission issues with the files created in the `dags/` and `logs/` folders.

Create a file named `.env` in the same directory:


```shell
# For Linux/macOS
echo -e "AIRFLOW_UID=$(id -u)" > .env

# For Windows, create the .env file manually and add this line:
# AIRFLOW_UID=50000
```

### Step 4: Initialize the Database

Before you can start Airflow, you must initialize its database. Docker Compose will use the `airflow-init` service to perform this task.


```shell
docker compose up airflow-init
```

This command will run a series of initialization scripts. You will see a success message when it's done, such as "Upgrades done" and "Admin user airflow created." The process may take a few minutes the first time.

### Step 5: Start Airflow Services

Once the database is initialized, you can start all the Airflow services.


```shell
docker compose up
```

This command will bring up the webserver, scheduler, triggerer, and database. The services will run in the background. If you want to see the logs, you can run it without the `-d` flag.

### Step 6: Access the Airflow UI

Airflow should now be running. Open your browser and navigate to:

```shell
http://localhost:8080
```

You will be prompted to log in. The default credentials are:

- **Username:** `airflow`    
- **Password:** `airflow`
    
After you log in, you will see the Airflow web interface. Initially, it will be populated with a number of example DAGs. You can disable these in the UI if you prefer.

## "Hello World" Project

To ensure everything is working and that you can create your own DAGs, let's create a simple "Hello World" DAG.

1. **Create the DAG File:** Create a new file named `hello_world_dag.py` inside the `dags/` folder you created in Step 1.
2. **Add the Code:** Copy and paste the following code into `hello_world_dag.py`.
    
```python
from __future__ import annotations

import pendulum

from airflow.models.dag import DAG
from airflow.operators.bash import BashOperator

with DAG(
  dag_id="hello_world_dag",
  start_date=pendulum.datetime(2023, 1, 1, tz="UTC"),
  schedule=None,
  catchup=False,
  tags=["example", "tutorial"],
) as dag:
  task1 = BashOperator(
      task_id="print_hello",
      bash_command="echo 'Hello, World from Apache Airflow!'",
  )

  task2 = BashOperator(
      task_id="print_date",
      bash_command="echo 'Today\'s date is: ' $(date)",
  )

  task1 >> task2  # Define the dependency: task2 runs after task1
```
    
1. **Verify in the UI:** Go back to the Airflow UI. After a few seconds, the new DAG (`hello_world_dag`) should appear in the list. If you don't see it, you can refresh the page.
    
2. **Run the DAG:**
    - Turn on the DAG by clicking the toggle switch next to its name.
    - Click the "Play" button (Trigger DAG) on the far right to run it manually.
    - In the "Graph" or "Gantt" view of the DAG, you'll see the tasks change color, indicating their status (Running, Success, etc.).
        
3. **Check the Results:** To view the logs for a task, click on it and select "Logs." You should see the messages "Hello, World from Apache Airflow!" and today's date, confirming that your tasks executed successfully.
    
## Useful Commands

- `docker compose up -d`: Starts the services in detached mode (background).
- `docker compose stop`: Stops the services.
- `docker compose down --volumes --remove-orphans`: Stops and removes containers, networks, and volumes, leaving a clean environment.
- `docker compose logs -f`: Follows the logs of all services.
- `docker compose exec <service_name> <command>`: Runs a command in a running container. For example, `docker compose exec webserver airflow users list` to view the user list.
    

## Include Requeriments.txt

In order to include the `requerimients.txt` file into the airflow, we must to change the docker image and the docker compose file.


1. Create a Dockerfile:

Create a Dockerfile in the same directory as your requirements.txt and docker-compose.yaml files.

```shell
FROM apache/airflow:3.0.3 # Replace with your desired Airflow version
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
```

2. Modify docker-compose.yaml:

Replace the image: line with build: . for the Airflow services that require these dependencies (e.g., airflow-scheduler, airflow-webserver, airflow-worker). This instructs Docker Compose to build an image from the Dockerfile in the current directory.

```shell
version: '3.8'
services:
  airflow-scheduler:
    # ... other configurations
    build: . # This tells Docker Compose to build the image from the current directory (where your Dockerfile is)
    # image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.7.3} # Remove or comment out this line
    # ... other configurations

  airflow-webserver:
    # ... other configurations
    build: . # Apply the same build instruction to the webserver as well
    # image: ${AIRFLOW_IMAGE_NAME:-apache/airflow:2.7.3} # Remove or comment out this line
    # ... other configurations

  # Apply similar changes to other Airflow services (e.g., airflow-worker) if they also need the custom dependencies.
```


3. Build and Run:
After making these changes, rebuild your Docker images and start your Airflow environment:

```shell
docker compose build
docker compose up
```

{{< notice "note" >}}

**Rebuild on changes:**
Any time you modify requirements.txt or Dockerfile, you must rebuild the Docker image using docker compose build for the changes to take effect.

**Production vs. Development:**
While this method is suitable for development, for production environments, consider pre-building and pushing your custom Airflow image to a container registry for better management and deployment.

**Permissions:**

Ensure that the Airflow user within the Docker container has the necessary permissions to install packages. The official Airflow Docker images typically handle this, but be aware if you encounter permission errors.
With this guide, you have a fully functional Airflow development environment with Docker, and the "Hello World" project ensures your basic configuration is correct.
{{< /notice >}}

