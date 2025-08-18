# Dockerfile (root of project)
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the pre-built JAR from backend/build/libs
COPY backend/build/libs/backend.jar backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]
