import { Elysia, t } from "elysia"
import { NitrogenController } from "../controllers/nitrogen.controller"

const nitrogenController = new NitrogenController()

const NitrogenSchema = {
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

export const nitrogen = new Elysia({ prefix: '/nitrogen' })
  .get("/", ({ query }) => 
    nitrogenController.getAll({ query }), {
    ...PaginationSchema
  })
  
  // Get nitrogen by id
  .get("/:id", ({ params }) => 
    nitrogenController.getById({ params }), {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Create new nitrogen
  .post("/", ({ body }) => 
    nitrogenController.create({ body }), {
    ...NitrogenSchema
  })
  
  // Update nitrogen
  .put("/:id", ({ params, body }) => 
    nitrogenController.update({ params, body }), {
    params: t.Object({
      id: t.String()
    }),
    ...NitrogenSchema
  })
  
  // Delete nitrogen
  .delete("/:id", ({ params }) => 
    nitrogenController.delete({ params }), {
    params: t.Object({
      id: t.String()
    })
  })