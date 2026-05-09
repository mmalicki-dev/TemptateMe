# TemptateMe

A full stack recipe management application built with React and Node.js.

## Features

**Recipes**
- Browse and search recipes by title, category or ingredients
- Add your own recipes with photos
- Add recipes to your favourites list
- Add ingredients to your shopping list

**Authentication**
- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Email verification via SendGrid

**Other**
- Image upload via ImgBB
- API documentation with Swagger
- Rate limiting and security headers

## Tech Stack

**Frontend:**
React 18 · Redux Toolkit · React Router · Axios · Storybook

**Backend:**
Node.js · Express · MongoDB · Mongoose · JWT · Swagger · Multer · Joi

**Architecture:**
Separate frontend and backend with shared environment configuration

**Testing:**
React Testing Library

## Live Demo

[temptateme.netlify.app](https://temptateme.netlify.app)

Backend hosted on Render *(migrating to VPS)*

## Coming Soon

React Native mobile application

## Running Locally

### Prerequisites
- Node.js 20+
- pnpm
- MongoDB

### Installation

```bash
# Clone the repository
git clone https://github.com/mmalicki-dev/TemptaTeMe.git
cd TemptaTeMe

# Install all dependencies
pnpm install-all

# Set up environment variables
cp backend/.env.example backend/.env
cp client/.env.example frontend/.env

# Start all services
pnpm start

# Or start individually
pnpm start-client
pnpm start-server
```

### Environment Variables

See [backend/.env.example](backend/.env.example)
and [frontend/.env.example](client/.env.example)

## Project Structure

```
TemptaTeMe/
├── client/     # React + Redux
└── backend/      # Node.js + Express + MongoDB
```

## License

MIT
