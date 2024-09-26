# Telegram Bot with nodeJs

Helps you to search from a database and read it remotely

## Deployment
This Telegram bot was deployed for free using webhooks and Express.js, making it efficient and cost-effective to run without the need for a dedicated polling server.

## Docker Example

Building the Docker Image
Build the Docker image using the following command:

```bash
docker build -t telegram-bot .
```

This command builds a Docker image named telegram-bot based on the instructions in your Dockerfile.

Running the Bot in a Docker Container
To start the bot, run it in a Docker container:

```bash
docker run -d -p 8000:8000 telegram-bot
```

This command starts the bot in a detached container, mapping port 8000 of the container to port 8000 on your host machine.

## Environment Configuration
Create a `.env` file for environment variables by using the provided `.env.example` template. Customize it with your own settings to configure the bot accordingly.

