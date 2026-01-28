ZenPark – Real-Time Urban Parking Orchestration

ZenPark is a full-stack smart parking management system designed to eliminate parking anxiety by providing a live digital twin of parking spaces for malls and corporate hubs.

Problem Statement

Urban drivers waste significant time searching for parking, while parking facility managers lack real-time visibility and analytics.

ZenPark solves this by:

Showing real-time slot availability

Allowing advance reservations

Providing analytics for facility owners

Core Features
Phase 1 – User & Admin Features

Authentication

Drivers (Customers)

Facility Managers (Admins)

Interactive Floor Plan

SVG/Canvas-based parking layout

Live slot availability (Occupied / Available)

Booking System

Malls: Slot reservation + QR code + simulated payment

Corporate: Employee slot allocation

Live Updates

Real-time slot status using WebSockets

Phase 2 – Management Features

Admin Dashboard

Peak hours analysis

Slot utilization metrics

🚧 Manual Slot Override

Block slots for maintenance or emergencies

🏗️ Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

SVG / Canvas for floor maps

Socket.io / Pusher (real-time updates)

Backend

Node.js

Express.js

Prisma ORM

WebSockets

Database

PostgreSQL

Deployment

AWS RDS – Database

AWS App Runner / Amplify – Backend & Frontend

🧩 System Architecture
Frontend (Next.js)
   ↓ REST / WebSocket
Backend (Node.js + Express)
   ↓ Prisma ORM
PostgreSQL Database (AWS RDS)

🗂️ Database Schema (Prisma)

The schema models:

Parking Sites (Malls / Offices)

Zones (Basements / Floors)

Individual Slots

Users & Bookings

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(DRIVER)
  bookings  Booking[]
  createdAt DateTime @default(now())
}

enum Role {
  DRIVER
  ADMIN
}

model ParkingSite {
  id      String @id @default(uuid())
  name    String
  address String
  type    SiteType
  zones   Zone[]
}

enum SiteType {
  MALL
  CORPORATE
}

model Zone {
  id            String @id @default(uuid())
  name          String
  parkingSiteId String
  parkingSite   ParkingSite @relation(fields: [parkingSiteId], references: [id])
  slots         Slot[]
}

model Slot {
  id         String  @id @default(uuid())
  slotNumber String
  isOccupied Boolean @default(false)
  price      Float   @default(50.0)
  zoneId     String
  zone       Zone    @relation(fields: [zoneId], references: [id])
  bookings   Booking[]
}

model Booking {
  id        String   @id @default(uuid())
  startTime DateTime @default(now())
  endTime   DateTime?
  status    BookingStatus @default(PENDING)
  qrCode    String   @unique
  userId    String
  slotId    String
}

enum BookingStatus {
  PENDING
  ARRIVED
  COMPLETED
  CANCELLED
}

🔌 API Endpoints
Feature	Endpoint	Method
Search Sites	/api/sites	GET
Get Floor Plan	/api/zones/:siteId	GET
Slot Availability	/api/slots/:zoneId	GET
Book Slot	/api/bookings	POST
Verify Entry (QR)	/api/verify/:qrCode	PATCH
User Booking History	/api/users/:id/bookings	GET
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/kalviumcommunity/<repo-name>.git
cd <repo-name>

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/zenpark

4️⃣ Prisma Setup
npx prisma init
npx prisma migrate dev

5️⃣ Run the Project
npm run dev

📋 Project Checklist

 PostgreSQL setup (AWS RDS / Supabase)

 Prisma schema & migrations

 Authentication (NextAuth)

 SVG parking map

 Real-time updates

 Booking & QR flow

 Admin dashboard

👥 Team Workflow

Feature-based branching (feature/booking, feature/auth)

Pull Requests required before merge

GitHub Issues for task tracking

GitHub Projects (Kanban)
## 🚀 Lesson: Next.js Rendering Strategies
This project demonstrates three powerful rendering strategies available in the Next.js App Router.

### 1. Static Site Generation (SSG)
- **Page**: `/ssg`
- **Implementation**: `fetch(..., { cache: 'force-cache' })` and `export const dynamic = 'force-static'`
- **Behavior**: The data is fetched ONCE at build time. The same HTML (and dog image) is served to every user.
- **Use Case**: Marketing pages, blogs, documentation.
- **Performance**: Fastest (served from CDN/cache).

### 2. Server-Side Rendering (SSR)
- **Page**: `/ssr`
- **Implementation**: `fetch(..., { cache: 'no-store' })` and `export const dynamic = 'force-dynamic'`
- **Behavior**: The data is fetched ON EVERY REQUEST. Users see a new dog image on every refresh.
- **Use Case**: Personalized dashboards, real-time data, authenticated routes.
- **Performance**: Slower (server must compute each request), but always fresh.

### 3. Incremental Static Regeneration (ISR)
- **Page**: `/isr`
- **Implementation**: `fetch(..., { next: { revalidate: 10 } })` and `export const revalidate = 10`
- **Behavior**: The page is static but regenerates in the background every 10 seconds.
- **Use Case**: News feeds, e-commerce listings, changing content that doesn't need to be instant.
- **Performance**: Fast (served from cache) with periodic updates.

### Reflection
**"What would change if your app had 10x more users — would you still use SSR everywhere, or move to static caching?"**

If this app had 10x or 100x more users, relying solely on **SSR** would be expensive and slow, as every single page view hits the server and database.
- **Move to SSG/ISR**: For public content (like parking site lists or blogs), we would move to **ISR**. This reduces the database load from 10,000 requests to just 1 request every 60 seconds, regardless of traffic.
- **Keep SSR**: For the user dashboard (`/dashboard`) or booking confirmation, we must keep **SSR** (or client-side fetching) because the data is unique to each user.



docker-compose up -d
npm run dev


Get AWS Credentials:

Log in to AWS Console -> IAM -> Users.
Create a user with AmazonS3FullAccess.
Go to Security Credentials -> Create Access Key.
Copy Access Key ID and Secret Access Key.
Update .env: Open .env and fill in:

AWS_ACCESS_KEY_ID="your_key"
AWS_SECRET_ACCESS_KEY="your_secret"
AWS_BUCKET_NAME="your-bucket-name"
Sync Database: Since I added a new table, run:

npx prisma db push