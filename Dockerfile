# Step 1: Build stage using Gradle
FROM gradle:8.3-jdk17 AS builder

# Set working directory
WORKDIR /app

# Copy everything into container
COPY . .

# Build the Spring Boot app (skip tests)
RUN gradlew clean build -x test

# Step 2: Run stage using slim JDK
FROM openjdk:17-jdk-slim

# Set working directory for runtime
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the port your app runs on (change if needed)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
