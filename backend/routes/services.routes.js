const {Router} = require('express')
const Service = require('../models/Service')
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post('/services/create', auth, async (req, res) => {
    try {
        const service = new Service({
            name: req.body.name,
            description: req.body.description,
            rating: req.body.rating,
            file: req.body.file,
        })

        await service.save();
        await res.status(201).json({ service })
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/services', auth, async (req, res) => {
    try {
        const services = await Service.find()
        await res.json(services)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/services/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        await res.json(service)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;