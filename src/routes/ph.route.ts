import { Elysia, t } from "elysia"
import { PhController } from "../controllers"

const phController = new PhController()

const PhSchema = {
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

export const ph = new Elysia({ prefix: '/ph' })
  .get("/", ({ query }) => 
    phController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get ph by id
  .get("/:id", ({ params }) => 
    phController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new ph
  .post("/", ({ body }) => 
    phController.create({ body }), {
    ...PhSchema
  })
  
  // Update ph
  .put("/:id", ({ params, body }) => 
    phController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...PhSchema
  })
  
  // Delete ph
  .delete("/:id", ({ params }) => 
    phController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })