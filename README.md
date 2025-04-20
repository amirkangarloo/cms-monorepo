![](https://github.com/amirkangarloo/cms-monorepo/blob/main/docs/imgae-01.png?raw=true)

# CMS Monorepo
This is a interview project for Backend Developer position. In this project, we will use the following technologies:
- Node.js
- NestJS
- TypeScript
- Nx Monorepo
- PostgreSQL
- Prisma
- Docker
- CQRS
- DDD (Domain Driven Design)

## Quick Start

### Step 1
Clone code from git repository and go to directory.

```bash
git clone https://github.com/amirkangarloo/cms-monorepo.git
```

```bash
cd cms-monorepo
```

### Step 2
Create test data base by docker postgres image and .env file.


```bash
npm run docker:db:up
```

```bash
cp .env.example .env
```

#### Note:
You can check docker status by this command and down docker container by secound command

```bash
// Check status
npm run docker:db:status

// Down container
npm run docker:db:down
```

### Step 3
Create DB schema by migration or db push command. (Use one of them)

```bash
npm run db:migrate
```
OR

```bash
npm run db:push
```

#### Note:
You can check your database by UI in your browser on port 555 by this command.

```bash
npm run db:view
```

### Step 4
Install project dependencies and run application.

```bash
npm i
```

```bash
npm run api
```


## API Document
This project use [Postman](https://github.com/amirkangarloo/cms-monorepo/blob/main/docs/API%20documentation%20CMS%20Monorepo.postman_collection.json "link") documentation.

## If I had more time

It's better work on:

1. Add Test (like unite)
2. Use more Nx monorepo features

## License
This project flow [MIT](https://github.com/amirkangarloo/cms-monorepo/blob/main/LICENSE "MIT") license.
