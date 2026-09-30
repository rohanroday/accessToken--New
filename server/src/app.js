import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from "./routers/auth.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);


export default app;

