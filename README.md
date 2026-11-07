# Zeltick — Event & Ticketing Platform

Zeltick is an event and ticketing platform backend built with Node.js, Express and MongoDB.

The project focuses on the backend engineering challenges involved in managing events, organizers, staff permissions, ticket inventory and reservations.

Beyond implementing API endpoints, Zeltick explores authentication, authorization, data consistency, concurrent requests, transactional operations and failure handling in a real-world application.

**Project Status:** Active Development — Phase 2

## Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express 5
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** Express Sessions, Argon2
- **Validation:** express-validator
- **Logging:** Pino and Pino HTTP
- **Email Service:** Resend
- **Other:** CORS, dotenv, connect-mongo

## Implemented Features

### 1. Authentication and User Management

- User registration and login.
- Password hashing using Argon2.
- Session-based authentication.
- MongoDB-backed session storage.
- Login rate limiting.
- Request validation and centralized error handling.
- Email verification foundations.
- Role-aware user management.

### 2. Event Management

- Event creation and management.
- Event ownership checks.
- Event publication controls.
- Public event responses restricted to explicitly allowed fields.
- Cursor-based pagination for event listings.
- Tracking whether an event has previously been published.

### 3. Organizer Management

- Organizer onboarding for eligible users.
- Email verification requirement before onboarding.
- Prevention of duplicate organizer accounts.
- Transactional creation of organizer records and corresponding user role updates.
- Organizer profile retrieval.
- Separation of organizer persistence and user persistence responsibilities.

### 4. Staff Management and Permissions

- Organizer staff assignment management.
- Support for organizer-level and event-specific staff assignments.
- Staff roles:
  - Manager
  - Ticket Seller
  - Check-in Staff
- Assignment status management, including active and revoked assignments.
- Tracking of the user who created an assignment.
- Permission checks based on staff roles and assignment scope.
- Managers can manage ticket sellers and check-in staff.
- Organizer-level permissions are distinct from event-specific assignments.

### 5. Ticket Types, Inventory and Reservations

- Ticket type management.
- Ticket prices represented in pesewas.
- Ticket inventory tracking.
- Ticket reservation holds.
- Inventory reservation using conditional database updates.
- MongoDB transactions for operations involving multiple related database changes.
- Prevention of overselling through atomic inventory updates.
- Expiration of ticket holds.
- Automatic inventory release when holds expire.
- Conditional status transitions to prevent duplicate inventory releases.

### 6. Backend Infrastructure and Reliability

- Centralized application error handling.
- Structured application and HTTP request logging using Pino.
- Environment-based configuration.
- Database connection management.
- Database connection established before the HTTP server starts listening.
- Graceful shutdown handling for database and session-store connections.
- Validation of environment configuration during application startup.

## Engineering Considerations

Zeltick is being developed with particular attention to backend correctness, data integrity and reliability.

Some of the engineering problems explored include:

**Data Consistency**

Using MongoDB transactions when multiple related database operations must succeed or fail together.

**Concurrency Control**

Using conditional database updates to protect shared ticket inventory when multiple users attempt to reserve tickets simultaneously.

**Idempotent State Transitions**

Ensuring that repeated ticket-hold expiration attempts do not release the same inventory multiple times.

**Authentication and Authorization**

Using password hashing, session management, role-aware access control and scoped staff permissions.

**Separation of Concerns**

Separating controllers, services, repositories and infrastructure responsibilities to keep HTTP handling, business rules and database operations maintainable.

**Graceful Failure Handling**

Managing database connections, application errors and shutdown procedures to avoid leaving resources unmanaged.

## Planned Features

The following features are part of the development roadmap and are not yet presented as completed functionality.

- Order creation and management.
- Checkout workflow.
- Payment integration with Paystack.
- Payment webhook processing and idempotency.
- Order cancellation and refunds.
- Organizer dashboards and reporting.
- Further automated testing and production deployment.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB instance (local or hosted)

### Installation

Clone the repository:

```bash
git clone https://github.com/inclined4X/Zeltick.git
```

Navigate into the project directory:

```bash
cd Zeltick
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root and configure the environment variables required by the application.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
RESEND_API_KEY=your_resend_api_key
```

The example above is illustrative. Refer to the application's environment configuration for the complete list of required variables.

**Important:** Never commit actual credentials, API keys, database connection strings or session secrets to version control.

### Running the Application

Start the development server:

```bash
npm run dev
```

The development server uses Nodemon to restart the application when source files change.

## Project Structure

The application source code is organized under the `src/` directory.

The backend follows a separation-of-concerns approach, separating responsibilities such as:

- Routes and middleware.
- Controllers.
- Services and business logic.
- Repositories and database operations.
- Models and data schemas.
- Application configuration and infrastructure.

## Project Status

Zeltick is an ongoing independent software engineering project.

Development is incremental, with emphasis on understanding system design decisions, enforcing business rules, maintaining data consistency and handling failure scenarios before expanding functionality.

## Author

**Jezemiah Sam**

GitHub: [@inclined4X](https://github.com/inclined4X)

Project Repository: [github.com/inclined4X/Zeltick](https://github.com/inclined4X/Zeltick)