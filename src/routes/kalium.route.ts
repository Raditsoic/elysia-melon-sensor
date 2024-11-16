import { Elysia, t } from "elysia"
import { KaliumController } from "../controllers"

const kaliumController = new KaliumController()

const KaliumSchema = {
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

export const kalium = new Elysia({ prefix: '/kalium' })
  .get("/", ({ query }) => 
    kaliumController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get kalium by id
  .get("/:id", ({ params }) => 
    kaliumController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new kalium
  .post("/", ({ body }) => 
    kaliumController.create({ body }), {
    ...KaliumSchema
  })
  
  // Update kalium
  .put("/:id", ({ params, body }) => 
    kaliumController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...KaliumSchema
  })
  
  // Delete kalium
  .delete("/:id", ({ params }) => 
    kaliumController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })