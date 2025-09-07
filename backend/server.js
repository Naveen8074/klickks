const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session =  require('express-session')
const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.port || 5000;
app.use(cors({
    origin: process.env.CLIENT_URL  || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : { secure: process.env.NODE_ENV === 'production'  }
}));

app.use('/', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})