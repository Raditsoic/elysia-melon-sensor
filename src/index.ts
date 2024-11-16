import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { 
  nitrogen,
  phospor,
  kalium,
  ph,
  moisture,
  temperature,
  conductivity,
 } from "./routes";

const app = new Elysia()
    .use(swagger()) 
    .get("/", () => "Hello Elysia")
    .use(nitrogen)
    .use(phospor)
    .use(kalium)
    .use(ph)
    .use(moisture)
    .use(temperature)
    .use(conductivity)
    .listen(3000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
