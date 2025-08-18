# Stage 1: Build backend
FROM gradle:8-jdk17 AS backend-build
WORKDIR /app
COPY backend/ /app
RUN gradle build --no-daemon

# Stage 2: Build frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/ /app
RUN npm install
RUN npm run build  # Adjust if your AngularJS build command is different

# Stage 3: Combine backend + frontend
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /app/build/libs/*.jar app.jar

# Copy frontend build to Spring Boot's static root
# Spring Boot serves files from /app/resources/static by default
RUN mkdir -p /app/resources/static
COPY --from=frontend-build /app/dist/ /app/resources/static/

# Expose port
EXPOSE 8080

# Run the backend
ENTRYPOINT ["java","-jar","app.jar"]
