import { Router } from 'express'
import { creatUserController } from './useCases/User/CreateUser'

const router = Router()
router.post('/users', (request, response) => {
  return creatUserController.handle(request, response)
})

export { router }
