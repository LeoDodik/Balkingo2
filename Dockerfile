# Use a slim JDK image for running the app
FROM openjdk:17-jdk-slim

# Set working directory in the container
WORKDIR /app

# Copy the locally built JAR into the container
# Make sure you run './gradlew clean build -x test' locally first
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app uses
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java","-jar","app.jar"]
