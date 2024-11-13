import { Elysia, t } from "elysia"
import { PhosporController } from "../controllers/phospor.controller"

const phosporController = new PhosporController()

const PhosporSchema = {
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

export const phospor = new Elysia({ prefix: '/phospor' })
  .get("/", ({ query }) => 
    phosporController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get phospor by id
  .get("/:id", ({ params }) => 
    phosporController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new phospor
  .post("/", ({ body }) => 
    phosporController.create({ body }), {
    ...PhosporSchema
  })
  
  // Update phospor
  .put("/:id", ({ params, body }) => 
    phosporController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...PhosporSchema
  })
  
  // Delete phospor
  .delete("/:id", ({ params }) => 
    phosporController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })