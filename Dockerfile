# Use a lightweight OpenJDK image
FROM openjdk:17-jdk-slim

# Install Gradle (if not using wrapper)
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://services.gradle.org/distributions/gradle-8.4-bin.zip -P /tmp && \
    unzip -d /opt/gradle /tmp/gradle-8.4-bin.zip && \
    ln -s /opt/gradle/gradle-8.4/bin/gradle /usr/bin/gradle

# Set working directory inside the container
WORKDIR /app

# Copy all project files
COPY . .

# Limit Gradle JVM memory to avoid OOM
ENV GRADLE_OPTS="-Xmx512m -Dorg.gradle.jvmargs=-Xmx512m"

# Build the project
RUN ./gradlew clean build --no-daemon

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend/build/libs/backend.jar"]
