import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { nitrogen } from "./routes/nitrogen.route";
import { phospor } from "./routes/phospor.route";
import { kalium } from "./routes/kalium.route";

const app = new Elysia()
    .use(swagger()) 
    .get("/", () => "Hello Elysia")
    .use(nitrogen)
    .use(phospor)
    .use(kalium)
    .listen(3000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
