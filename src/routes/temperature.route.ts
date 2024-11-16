import { Elysia, t } from "elysia"
import { TemperatureController } from "../controllers"

const temperatureController = new TemperatureController()

const TemperatureSchema = {
  body: t.Object({
    value: t.Number()
  })
}

const PaginationSchema = {
  query: t.Object({
    page: t.Optional(t.Number()),
    limit: t.Optional(t.Number()),
    sort: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')]))
  })
}

export const temperature = new Elysia({ prefix: '/temperature' })
  .get("/", ({ query }) => 
    temperatureController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get temperature by id
  .get("/:id", ({ params }) => 
    temperatureController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new temperature
  .post("/", ({ body }) => 
    temperatureController.create({ body }), {
    ...TemperatureSchema
  })
  
  // Update temperature
  .put("/:id", ({ params, body }) => 
    temperatureController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...TemperatureSchema
  })
  
  // Delete temperature
  .delete("/:id", ({ params }) => 
    temperatureController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })