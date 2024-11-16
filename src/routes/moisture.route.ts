import { Elysia, t } from "elysia"
import { MoistureController } from "../controllers"

const moistureController = new MoistureController()

const MoistureSchema = {
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

export const moisture = new Elysia({ prefix: '/moisture' })
  .get("/", ({ query }) => 
    moistureController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get moisture by id
  .get("/:id", ({ params }) => 
    moistureController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new moisture
  .post("/", ({ body }) => 
    moistureController.create({ body }), {
    ...MoistureSchema
  })
  
  // Update moisture
  .put("/:id", ({ params, body }) => 
    moistureController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...MoistureSchema
  })
  
  // Delete moisture
  .delete("/:id", ({ params }) => 
    moistureController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })