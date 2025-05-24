# SwiftSeats - Bus Reservation System

A full-stack bus reservation system built with Spring Boot and React that allows users to book bus tickets and administrators to manage bus services.

## Features

- User Authentication with JWT
- Email verification with OTP
- Role-based access (Admin/User)
- Real-time seat availability
- Bus search with date and route
- City suggestions using GeoDB Cities API
- Ticket booking and cancellation
- Admin dashboard for bus management
- Responsive design with Tailwind CSS

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Security
- MongoDB
- JWT Authentication
- Spring Mail
- Lombok

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Axios
- React Router DOM 7
- Headless UI

## Prerequisites

- Java 21+
- Node.js and npm
- MongoDB
- Maven

## Getting Started

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Bus-Reservation-System
```

2. Set environment variables in `application.properties`:
```properties
USER_EMAIL=your-email@gmail.com
USER_PASSWORD=your-email-password
```

3. Start MongoDB service

4. Run the Spring Boot application:
```bash
cd backend
./mvnw spring-boot:run
```

The server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/app/backend/
│   │   │   │   ├── configuration/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── service/
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── public/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Authentication
- POST `/login` - User login
- POST `/register` - New user registration
- POST `/generateOTP` - Generate email verification OTP
- POST `/verifyOTP` - Verify email OTP

### User Operations
- GET `/user/getBookedBuses` - Get user's booked buses
- GET `/user/getCancelledBuses` - Get user's cancelled buses
- POST `/bookBus` - Book a bus
- POST `/cancelBus` - Cancel a booking

### Admin Operations
- GET `/getAdminBuses` - Get admin's buses
- POST `/addBus` - Add new bus
- POST `/manageBus` - Update bus details
- DELETE `/deleteBus/{id}` - Delete a bus

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.