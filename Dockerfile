FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY . .
RUN ./gradlew clean build -x test

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/Balkingo2-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080
