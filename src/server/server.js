import express from "express"
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import morgan from "morgan";
import path from "path";
import cartRouter from "../routers/cartRouter.js";
import productsRouter from "../routers/productsRouter.js";
import { __dirname } from "../dirname.js";
import { viewsRoutes } from "../routers/view.routes.js";

const server = express(); 

server.use(morgan("dev"));
server.use(express.json())
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.resolve(__dirname, "../public")));

// Handlebars config
server.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
server.set("view engine", "hbs");
server.set("views", path.resolve(__dirname, "./views"));

server.use("/", viewsRoutes)
server.use('/api/products', productsRouter);
server.use('/api/carts', cartRouter);



export default server;