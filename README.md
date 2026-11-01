# Airbnb Clone - MySQL Version

This is the MySQL migration of my full-stack Airbnb clone. 

## What changed?
- Replaced JSON file storage (`fs` module) with a real MySQL database.
- Designed a relational schema (Users, Homes, Favourites).
- Used `mysql2` for async database connections.
- Wrote raw SQL queries for all CRUD operations.

## Tech Stack
- Node.js, Express.js
- MySQL, `mysql2`
- EJS (Templating)
- Tailwind CSS

## How to run locally
1. Clone the repo.
2. Run `npm install`.
3. Set up your local MySQL database.
4. Create a `.env` file (use `.env.example` as a template).
5. Run `node App.js`.