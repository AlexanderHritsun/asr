const {Router} = require('express')
const Service = require('../models/Service')
const auth = require('../middleware/auth.middleware')
/*const role = require('../middleware/role.middleware')*/
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {
        const service = new Service({
            name: req.body.name,
            description: req.body.description,
            rating: req.body.rating,
            files: req.body.files,
        })

        await service.save();
        await res.status(201).json({ service })
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
        await res.json(services)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('reviews')
        await res.json(service)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;