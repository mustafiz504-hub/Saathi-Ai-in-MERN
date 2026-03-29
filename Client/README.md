# Saathi AI Project Notes (Client + Server)

Ye README Hinglish me maintain kiya gaya hai, taaki abhi tak kya bana hai aur server me kaunse controller/functions chal rahe hain, wo clear rahe.

## 1) Current Project Snapshot

1. Stack:
   - Client: React + Vite + Tailwind + DaisyUI + React Router
   - Server: Node.js + Express + MongoDB + JWT + Google OAuth
2. Client API base URL:
   - `/auth` (Vite Proxy handled)
3. Local run ports:
   - Client: `http://localhost:4001`
   - Server: `http://localhost:8080`

## 2) Client Side Abhi Tak Kya Hua

1. Signup form implemented hai (`react-hook-form` validation ke saath).
2. Signup me password/confirm-password matching check ho raha hai.
3. Signup success hone par ab automatic login hota hai (`setAuthUser` trigger).
4. Google login component integrated hai (`@react-oauth/google`).
5. Dashboard UI ready hai (name/email/avatar localStorage se read hota hai).
6. Chat Sidebar restore kar diya gaya hai (`Left.jsx`) aur users list dynamic loop se render ho rahi hai.
7. Login form backend `POST /auth/login` ke saath connected hai.
8. `AuthProvider` + `useAuth` context add kiya gaya hai auth state share karne ke liye.
9. App root ko `AuthProvider` se wrap kiya gaya hai, aur internal routes `authUser` state par dependent hain.
10. Login aur Signup dono API response ko `localStorage("messenger")` ke saath auth context me bhi sync karte hain.
11. Initial auth state cookie `jwt` ya localStorage se read hoti hai (`js-cookies` use karke).
12. Logout logic `Logout.jsx` me implemented hai (Cookie cleanup + LocalStorage clear + State reset).

## 2.1) Client Auth Flow (Update)

1. `Client/src/context/AuthProvider.jsx`
   - `AuthContext` create karta hai
   - Startup par start state hydrate karta hai.
2. `Client/src/components/Login.jsx` & `Signup.jsx`
   - Successful call ke baad `setAuthUser(response.data)` call karte hain.
3. `Client/src/Home/left1/Logout.jsx`
   - `api.post("/logout")` call karta hai aur local state saaf karta hai.

## 3) Server Route Mapping

Base route: `/auth`

1. `GET /auth/test` - Route connectivity check.
2. `GET /auth/google` - Google OAuth flow.
3. `POST /auth/signup` - Manual Registration (UserModel2).
4. `POST /auth/login` - Manual Login.
5. `POST /auth/logout` - Clear JWT Cookie.
6. `GET /auth/allUsers` - Fetch all users except logged-in user (Protected by `secureRoute`).

## 4) Server Controllers Detailed

### A) `Server/controllers/user.controller.js`
- `signup`: Hash password, save user, create cookie.
- `login`: Check credentials, create cookie, return user.
- `logout`: `res.clearCookie("jwt")`.
- `getUserProfile`: `UserModel2.find({ _id: { $ne: loggedInUser } })`.

### B) `Server/controllers/authController.js`
- `googleLogin`: Exchange code for user info, create JWT, return social-login user.

## 5) Pending Work (Next Steps)

1. `secure: "strict"` ko production me `secure: true` par set karna.
2. Messages logic implement karna (Backend socket/routes + Frontend state).
3. Search functionality in sidebar.
4. UI polish for chat bubbles.
