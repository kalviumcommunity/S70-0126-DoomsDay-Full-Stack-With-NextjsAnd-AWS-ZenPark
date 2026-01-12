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