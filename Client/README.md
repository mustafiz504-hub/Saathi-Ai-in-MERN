# Saathi AI Project Notes (Client + Server)

Ye README Hinglish me maintain kiya gaya hai, taaki abhi tak kya bana hai aur server me kaunse controller/functions chal rahe hain, wo clear rahe.

## 1) Current Project Snapshot

1. Stack:
   - Client: React + Vite + Tailwind + DaisyUI + React Router
   - Server: Node.js + Express + MongoDB + JWT + Google OAuth
2. Client API base URL:
   - `http://localhost:8080/auth`
3. Local run ports:
   - Client: `http://localhost:5173`
   - Server: `http://localhost:8080`

## 2) Client Side Abhi Tak Kya Hua

1. Signup form implemented hai (`react-hook-form` validation ke saath).
2. Signup me password/confirm-password matching check ho raha hai.
3. Signup success/error alerts working mode me hain.
4. Google login component integrated hai (`@react-oauth/google`).
5. Dashboard UI ready hai (name/email/avatar localStorage se read hota hai).
6. Chat component me old full layout code present hai, lekin abhi comment mode me.
7. Login form backend `POST /auth/login` ke saath connected hai.
8. `AuthProvider` + `useAuth` context add kiya gaya hai auth state share karne ke liye.
9. App root ko `AuthProvider` se wrap kiya gaya hai, taaki global auth state available rahe.
10. Login aur Signup dono API response ko `localStorage("messenger")` ke saath auth context me bhi sync karte hain.
11. Initial auth state cookie `jwt` ya localStorage se read hoti hai (`js-cookies` use karke).
12. Current active routes mainly:
   - `/chat`
   - `/*` (PageNotFound fallback)
13. Current testing flow me `Chat.jsx` temporary taur par `Signup` aur `Login` components render kar raha hai.

## 2.1) Client Auth Flow (Naya)

1. `Client/src/context/AuthProvider.jsx`
   - `AuthContext` create karta hai
   - `authUser` aur `setAuthUser` expose karta hai
   - startup par `jwt` cookie ya `messenger` localStorage se user state hydrate karta hai
2. `Client/src/main.jsx`
   - pure app ko `AuthProvider` se wrap karta hai
3. `Client/src/components/Login.jsx`
   - successful login ke baad response ko localStorage aur auth context dono me save karta hai
4. `Client/src/components/Signup.jsx`
   - successful signup ke baad response ko localStorage aur auth context dono me save karta hai

## 3) Server Route Mapping

Base route: `/auth`

1. `GET /auth/test`
   - Basic test endpoint, route connectivity verify karne ke liye.
2. `GET /auth/google`
   - Google OAuth code exchange + user login/register.
3. `POST /auth/signup`
   - Manual user registration.
4. `POST /auth/login`
   - Manual user login.
5. `POST /auth/logout`
   - JWT cookie clear karke logout.

## 4) Server Controllers Detailed (Point-wise)

### A) `Server/controllers/user.controller.js`

#### 1. `signup(req, res)`

1. Request body se `name`, `email`, `password`, `confirmpassword` read karta hai.
2. Agar password mismatch ho to `400` with message: `Passwords do not match`.
3. DB me same email exist karta ho to `400` with message: `Email already exists`.
4. Password ko `bcrypt.hash(..., 10)` se hash karta hai.
5. New user `UserModel2` me save karta hai.
6. Save successful hone par `createTokenAndSaveCookie(newUser._id, res)` call hota hai.
7. Response `201` ke saath public user data return karta hai:
   - `_id`, `name`, `email`
8. Server error pe `500` with `message: "Server Error"`.

#### 2. `login(req, res)`

1. Body se `email` aur `password` leta hai.
2. Email ke basis pe user find karta hai.
3. User na mile to `400` with `Invalid email or Password`.
4. `bcrypt.compare` se password check karta hai.
5. Password mismatch pe same `400` error deta hai.
6. Valid hone par `createTokenAndSaveCookie(user._id, res)` call hota hai.
7. Response `200` ke saath `_id`, `name`, `email` return karta hai.
8. Exception pe `500` with `Server Error`.

#### 3. `logout(req, res)`

1. `res.clearCookie("jwt")` karta hai.
2. `200` ke saath `User logged out successfully` response deta hai.
3. Error case me `500` deta hai.

### B) `Server/controllers/authController.js`

#### 1. `googleLogin(req, res)`

1. Query se Google auth `code` read karta hai.
2. `oauth2client.getToken(code)` se access token fetch karta hai.
3. Google userinfo API hit karta hai aur `email`, `name`, `picture` leta hai.
4. DB me user check karta hai:
   - agar user nahi hai to new record create karta hai (`UserModel`).
5. JWT token sign karta hai:
   - payload: `{ _id, email }`
   - secret: `process.env.JWT_SECRET`
   - expiry: `process.env.JWT_TIMEOUT`
6. Success pe `200` return karta hai:
   - `message`, `token`, `user`
7. Error pe `500` with `message: err.message`.

## 5) Server Helper Function Detailed

### `Server/jwt/generateToken.js`

#### `createTokenAndSaveCookie(userId, res)`

1. `jwt.sign` se token banata hai:
   - payload: `{ userId }`
   - secret: `process.env.JWT_TOKEN`
   - expiry: `process.env.JWT_TIMEOUT`
2. Response me cookie set karta hai:
   - cookie name: `jwt`
   - `httpOnly: true`
   - `sameSite: true`
   - `secure: "strict"` (current code me isi form me set hai)

## 6) Server Support Files (Quick Notes)

1. `Server/index.js`
   - Express app setup
   - CORS config (`origin` from `CLIENT_ORIGIN`, `credentials: true`)
   - `/auth` router mount
2. `Server/models/dbConnection.js`
   - MongoDB connect with `DB_URL`
   - DB name force set: `SaathiAi-Chat-App`
3. `Server/utils/googleConfig.js`
   - Google OAuth2 client initialize karta hai env credentials se.
4. `Server/models/userModel.js`
   - Google login users schema (`name`, `email`, `profilePic`).
5. `Server/models/userModel2.js`
   - Manual auth users schema (`name`, `email`, `password`, `confirmpassword`).

## 7) Pending Work (Recommended Next)

1. `App.jsx` me login/dashboard/private route flow activate karna.
2. `Chat.jsx` me temporary `Signup`/`Login` rendering hata kar actual auth-based screen switch restore karna.
3. `secure: "strict"` ko cookie config me proper boolean strategy ke saath revise karna (dev/prod basis).
4. Error handling standardize karna:
   - backend key mostly `message` hai, to frontend me `error.response.data.message` use karo.
