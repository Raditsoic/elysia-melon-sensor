import { Elysia, t } from "elysia"
import { ConductivityController } from "../controllers"

const conductivityController = new ConductivityController()

const ConductivitySchema = {
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

export const conductivity = new Elysia({ prefix: '/conductivity' })
  .get("/", ({ query }) => 
    conductivityController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get conductivity by id
  .get("/:id", ({ params }) => 
    conductivityController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new conductivity
  .post("/", ({ body }) => 
    conductivityController.create({ body }), {
    ...ConductivitySchema
  })
  
  // Update conductivity
  .put("/:id", ({ params, body }) => 
    conductivityController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...ConductivitySchema
  })
  
  // Delete conductivity
  .delete("/:id", ({ params }) => 
    conductivityController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })