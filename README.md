# Backend

## Tecnologias utilizadas

- Java JDK 25
- Maven 3.9.9
- Spring Boot 4.1.0
- Banco de dados PostgreSQL
- Spring Validation

## Acessar API

- Para acessar a API: [http://localhost:8080/api](http://localhost:8080/api)

## Acessar banco de dados PostgreSQL

- Para acessar o banco de dados: [http://localhost:5432/votacao](http://localhost:5432/votacao)
- Login: postgres
- Senha: postgres

## Teconlogias utilizadas para infraestrutura

- Docker
- Docker Compose

## Rodar aplicação no local pela linha de comando

```bash
docker-compose up -d
```

```bash
mvn clean install
```

```bash
mvn spring-boot:run
```

---

# Frontend

## Tecnologias utilizadas

- Angular 21
- Typescript
- Material UI
- Date-fns

## Ferramentas necessárias

- Node >= v24.13.0

## Rodar aplicação no local pela linha de comando

- Para acessar o frontend: [http://localhost:4200/](http://localhost:4200/)

```bash
npm install
```

```bash
ng serve
```

# Executando o projeto com Docker

Para executar os containers em segundo plano:

```bash
docker compose up --build -d
```

Após a inicialização, acesse:

Frontend
[http://localhost](http://localhost)
Backend
[http://localhost:8080/api](http://localhost:8080/api)

PostgreSQL
[localhost:5432](http://localhost:5432)

- Login: postgres
- Senha: postgres

Subir o projeto

```bash
docker compose up -d
```

Subir reconstruindo as imagens

```bash
docker compose up --build
```
