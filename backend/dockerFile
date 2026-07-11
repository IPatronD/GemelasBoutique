# Etapa 1: Empaquetar el proyecto usando Maven y Java 21
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src /app/src
RUN mvn clean package -DskipTests
 
# Etapa 2: Crear el entorno ligero de ejecución
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copiamos el archivo .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Comando final para arrancar tu API
ENTRYPOINT ["java", "-jar", "app.jar"]
