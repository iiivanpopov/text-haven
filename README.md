# TextHaven

TextHaven is a web application designed for sharing and managing text-based content. It provides a simple and convenient platform for users to create, share, and manage their texts online.

## Features

- **User Authentication**: Register, login, and manage your account.
- **Text Storage**: Create, update, and delete text files and folders.
- **Public and Private Sharing**: Control the visibility of your texts with public and private options. Also you can save your text as note or post.
- **Dashboard**: Manage your texts and folders in a user-friendly interface.
- **Redis Caching**: Improve performance with caching for frequently accessed data.
- **AWS S3 Integration**: Store and retrieve text files securely using AWS S3.

## Technologies Used

### Backend

- [**Bun**](https://www.bun.sh/)
- [**Express.js**](https://www.expressjs.com/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Prisma**](https://www.prisma.io/)
- [**Redis**](https://redis.io/)
- [**PostgreSQL**](https://www.postgresql.org/)
- [**AWS S3**](https://aws.amazon.com/s3/)

### Frontend

- [**Next.js**](https://nextjs.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)

## Installation

### Prerequisites

- [Docker](https://docker.com/)
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)

Nodejs needs additional configuration

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/iiivanpopov/text-haven.git
   cd text-haven
   ```

2. Set up environment variables:

   - Copy `.env.example` to `.env`, then configure.

3. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: `http://localhost:<PORT>`
   - Backend API: `http://localhost:<PORT>/api`

## Project Structure

### Backend

- **`src/app.ts`**: Main Express app configuration.
- **`src/modules`**: Contains feature modules (e.g., `auth`, `cloud`, `user`).
- **`src/utils`**: Utility functions and helpers.
- **`prisma`**: Database schema and migrations.

### Frontend

- **`src/app`**: Next.js pages and layouts.
- **`src/components`**: Reusable React components.
- **`src/utils`**: Utility functions for the frontend.

## Scripts

### Backend

- `dev`: Start the backend in development mode.
- `build`: Build the backend for production.
- `start`: Start the backend in production mode.

### Frontend

- `dev`: Start the frontend in development mode.
- `build`: Build the frontend for production.
- `start`: Start the frontend in production mode.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
