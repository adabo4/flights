# ✈️ Flights — React + Express + PostgreSQL

A full-stack demo app for searching flights and managing bookings.  
Client is a React single-page application; server is an Express REST API backed by PostgreSQL.  
Production is served behind Nginx with a reverse proxy to the API.

> Live (demo): `flights.home.sk`
> Monorepo layout: `client/` (React), `server/` (Node/Express)


---

## 🚀 Features

- **Browse flights** with basic filters (date, origin, destination)
- **Create and manage bookings** (passenger details, seat/class, companions)
- **REST API** with versioned routes (`/v1/...`)
- **PostgreSQL** persistence with seed data
- **Env-based config** for local vs production
- **CI/CD friendly** (PM2 + Nginx ready; easy to add GitHub Actions)

---

## 🧱 Tech Stack

**Frontend:** React, React Router, Fetch/axios  
**Backend:** Node.js, Express, CORS, dotenv  
**Database:** PostgreSQL (SQL schema & seed script)  
**Infra (prod):** Nginx reverse proxy, PM2 process manager

---

## 🗂️ Project Structure

/client # React SPA
/server # Express API
/src
/routes # REST endpoints
/controllers # Request handlers
/models # DB queries / SQL helpers
/config # env + db connection
server.js # App entry
package.json # (root scripts for convenience)

---







