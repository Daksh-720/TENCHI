ＴΞNCHI-DATA

An online clipboard and file-sharing platform — paste text or drop files, get a short share code (or link), and share it with anyone. Inspired by tools like online-clipboard.online.

Live app: https://tenchi-data.vercel.app/

📋 Table of contents
Features
Tech stack
Project structure
API overview
Running locally
License
✨ Features
🔗 Sharing
Share plain text, images, videos, or files instantly via a short, unique share code
Upload a single file or multiple files in one clip
Retrieve any clip by entering its share code
⏳ Expiry & cleanup
Set a custom expiry — anywhere from 1 minute to 2 days
Expired clips are auto-deleted by a scheduled cleanup job
👤 Accounts
Sign up / log in with email + password, or with Google OAuth2
Logged-in users get a saved history of their past clips
🎨 UI
Light/dark theme toggle
Animated galaxy background with smooth theme-transition effects

🛠 Tech stack
Frontend	
Framework	React 19 + Vite
Styling	Tailwind CSS 4
Animation	Framer Motion (motion), ogl for the WebGL galaxy background
Hosting	Vercel

Backend	
Framework	Java 21 + Spring Boot
Auth	Spring Security with JWT, plus Google OAuth2 login
Persistence	Spring Data JPA + MySQL
File storage	Local filesystem (path referenced in the database)
Background jobs	Scheduled cleanup service purges expired clips every minute
Deployment	Dockerized
