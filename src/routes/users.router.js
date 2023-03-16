import { Router } from 'express'
import { validarUsuario } from '../middlewares/userValidations.middelewares'

const users = []
const router = Router()

router.get('/', (req, res) => {
    res.json({ users })
})

router.post('/', validarUsuario, (req, res) => {
    const obj = req.body
    users.push(obj)
    res.json({ message: 'User added' })
})

// router.put()

// router.delete()

export default router