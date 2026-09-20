FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY pom.xml ./
COPY .mvn/ .mvn
COPY mvnw ./
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -B
COPY src ./src

RUN ./mvnw clean package -DskipTests
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar target/*.jar"]

