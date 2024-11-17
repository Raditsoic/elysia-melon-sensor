import { Elysia, t } from "elysia"
import { SensorDataController } from "../controllers"

const sensorDataController = new SensorDataController()

const sensorDataSchema = {
  body: t.Object({
    nitrogen: t.Number(),
    phospor: t.Number(),
    kalium: t.Number(),
    ph: t.Number(),
    temperature: t.Number(),
    moisture: t.Number(),
    conductivity: t.Number(),
  })
}

const PaginationSchema = {
  query: t.Object({
    page: t.Optional(t.Number()),
    limit: t.Optional(t.Number()),
    sort: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')]))
  })
}

export const sensorData = new Elysia({ prefix: '/sensor-data' })
  .get("/", ({ query }) => 
    sensorDataController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get temperature by id
  .get("/:id", ({ params }) => 
    sensorDataController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new temperature
  .post("/", ({ body }) => 
    sensorDataController.create({ body }), {
    ...sensorDataSchema
  })
  
  // Update temperature
  .put("/:id", ({ params, body }) => 
    sensorDataController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...sensorDataSchema
  })
  
  // Delete temperature
  .delete("/:id", ({ params }) => 
    sensorDataController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })