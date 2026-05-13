# Backend NestJS API

REST API backend built using NestJS, TypeORM, SQLite, JWT Authentication, and Swagger Documentation.

---

## Features

- Authentication with JWT
- Register & Login API
- Protected Routes using Guard
- User Management
- Pagination & Filtering
- Swagger API Documentation
- TypeORM Integration
- SQLite Database
- Environment Configuration
- Token Blacklist Logout System

---

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- SQLite
- Passport JWT
- Swagger
- bcrypt

---

## Installation

Clone repository:

```bash
git clone https://github.com/nurhabibrs/backend-nestjs-api.git
```

Move into project directory:

```bash
cd backend-nestjs-api
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Copy `.env.example` file to `.env`:

```env
copy .env.example .env
```
Fill the `.env` file like in here:

```env
NODE_ENV=your_env (ex. development/production)
PORT=your_localhost_port (ex. 8000)
JWT_SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=your_origins (ex. http://localhost:8000)

DB_TYPE=sqlite
DB_NAME=db.sqlite
```

---

## Database Migration

Run migration:

```bash
npm run migration:run
```

Revert migration:

```bash
npm run migration:revert
```

---

## Running the App

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run build
npm run start:prod
```

Application will run at:

```txt
http://localhost:8000
```

---

## Swagger Documentation

Swagger available at:

```txt
http://localhost:8000/api/docs
```

### Swagger Authentication

1. Login using `/auth/login`
2. Copy `access_token`
3. Click `Authorize`
4. Paste the `access_token`

---

## Scripts

```bash
# development
npm run start:dev

# production
npm run start:prod

# build
npm run build

# lint
npm run lint

# test
npm run test
```

---

## Author

[Nur Habib Rizki Saputro](https://github.com/nurhabibrs)