# Stage 1: Build
FROM gradle:8.3-jdk17 AS builder
WORKDIR /app
COPY . .
# Build without running tests
RUN gradle clean build -x test

# Stage 2: Runtime
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy the JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
