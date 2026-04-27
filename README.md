# Notes App

A full-stack Notes Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to securely create, manage, and search notes with a clean and responsive interface.

Live Demo: https://notes-31ls.vercel.app/<img width="1916" height="853" alt="Screenshot 2026-04-27 114711" src="https://github.com/user-attachments/assets/8d93ff74-c8c3-41e6-b568-234b55d3d9ab" />


---

## Features

- User Authentication (Signup / Login)
- Create, update, and delete notes
- Search notes functionality
- Dark mode support
- Responsive user interface
- Secure backend using JWT authentication

---

## Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Mongoose)

Deployment:
- Frontend: Vercel
- Backend: Render

---

## Project Structure

/client     -> Frontend (React)
/server     -> Backend (Node + Express)

---

## Installation and Setup

### Clone the repository

git clone https://github.com/Shreynaik1/Notes.git  
cd Notes  

---

### Install dependencies

Frontend:

cd client  
npm install  

Backend:

cd server  
npm install  

---

### Environment Variables

Create a `.env` file inside `/server`:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
PORT=5000  

---

### Run the application

Backend:

cd server  
npm run dev  

Frontend:

cd client  
npm start  

---

## Deployment

Frontend: Vercel  
Backend: Render  

---

## Screenshots

<img width="1918" height="852" alt="Screenshot 2026-04-27 114658" src="https://github.com/user-attachments/assets/5d4d8980-cd2d-4c71-9eee-06383106279d" />
<img width="1890" height="842" alt="Screenshot 2026-04-26 083756" src="https://github.com/user-attachments/assets/087c30f6-b425-4307-9b6f-d3535df2289d" />
<img width="1902" height="848" alt="Screenshot 2026-04-26 083549" src="https://github.com/user-attachments/assets/30161d14-2964-45f2-a9b2-250de9b98da3" />
<img width="1903" height="862" alt="Screenshot 2026-04-26 083519" src="https://github.com/user-attachments/assets/7a254c69-0fd6-4ebe-a999-d8b3bf210f91" />
<img width="1906" height="866" alt="Screenshot 2026-04-26 083440" src="https://github.com/user-attachments/assets/2ddfe286-7eab-49cc-905e-1865a11abe26" />
<img width="1916" height="853" alt="Screenshot 2026-04-27 114711" src="https://github.com/user-attachments/assets/3da22418-e703-49bd-a3cf-4b52e90e6632" />




---

## Future Improvements

- Reminder and notification system for important notes
- File and image attachment support within notes
- API rate limiting and security enhancements
- Lazy loading and pagination for performance optimization  
- Caching strategies for faster data retrieval  

- Performance optimization

---

## License

This project is licensed under the MIT License.

---

## Author

Shrey Naik  
MERN & Next.js Developer
