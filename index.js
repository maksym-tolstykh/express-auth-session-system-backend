import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize"

import UserRouter from "./routes/UserRoute.js"
import AuthRouter from "./routes/AuthRouter.js"

import db from "./config/Database.js";

dotenv.config();

//оголошуємо змінну для експресу
const app = express();
//конфігурація store для зберігання сесій
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
    checkExpirationInterval: 5 * 60 * 1000,
    expiration: 10 * 60 * 1000
});
//конфігурація експресу під сесії
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: "auto",
    }

}));
//корси
app.use(cors());
//конфігурація для відпраки json
app.use(express.json());

/*Routes */
app.use(UserRouter);
app.use(AuthRouter);

//прослуховування порту для відповіді серверу
app.listen(process.env.APP_PORT, () => {
    console.log("Server up!");
})



//     (async () => {
//         await db.sync();
//     })();
// store.sync();

// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:3000']
// }));