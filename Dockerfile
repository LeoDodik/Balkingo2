FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the pre-built JAR from backend/build/libs
COPY backend/build/libs/backend-0.0.1-SNAPSHOT.jar backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]
