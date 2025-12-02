
## Requirement
- Node.js 16.15.0 or higher
- Git
- PostgreSQL

## Installation

Clone this repository
```bash
  git clone https://github.com/anis000romzi/mini-booking-api.git
  cd mini-booking-api
```

Install dependency
```bash
  npm install
```

Create and configure your own environment
```bash
  cp .env.example .env
```

Create database
```bash
  npm run db:create
```

Migrate and seed database
```bash
  npm run migrate
  npm run seed
```

Run the application in dev mode
```bash
  npm run start:dev
```

Run the application in prod mode
```bash
  npm run start:prod
```

Build the application
```bash
  npm run build
```

Run the built version of application
```bash
  npm run start
```

## API Documentation
Open the API documentation from browser: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
