# -------- Build Stage --------
FROM gradle:8.3-jdk17 AS builder
WORKDIR /app

# Copy only the build files first for caching
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
RUN gradle dependencies --no-daemon || true

# Copy the rest of the source code
COPY src ./src

# Build the project
RUN gradle build -x test --no-daemon

# -------- Run Stage --------
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
