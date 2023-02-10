import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize"

import UserRouter from "./routes/UserRoute.js"
import AuthRouter from "./routes/AuthRouter.js"

import db from "./config/Database.js";

dotenv.config();

const app = express();

// (async () => {
//     await db.sync();
// })();
// store.sync();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto"
    }

}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.use(express.json());

/*Routes */
app.use(UserRouter);
app.use(AuthRouter);



app.listen(process.env.APP_PORT, () => {
    console.log("Server up!");
})
