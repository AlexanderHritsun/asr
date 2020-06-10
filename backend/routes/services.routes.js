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
        const query = {};
        const search = req.query.search;
        if (search) {
            query['name'] = { $regex: new RegExp(search.toLowerCase(), 'i')};
            const result = await Service.find(query)
            return await res.json(result)
        }

        const services = await Service.find()
        await res.json(services)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate({
            path: 'reviews',
            populate: { path: 'userId' }
        });
        await res.json(service)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.delete('/:id/delete', auth, async (req, res, next) => {
    try{
        await Service.findByIdAndRemove(req.params.id,(error, data) => {
            if(error){
                return next(error)
            }
            else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    }
    catch (e) {
        console.log(e)
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router;