const {Router} = require('express')
const Post = require('../models/Post')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const router = Router();

router.post('/create',
    [
        auth,
        check('title')
            .custom( value => {
                if(!value){
                    return Promise.reject('Заголовок обязательное поле')
                }
                return true
            }),
        check('text')
            .custom( value => {
                if(!value){
                    return Promise.reject('Текст не может быть пустым')
                }
                return true
            })
    ],
    async (req, res) => {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const errorMessages = errors.array().map(el => el.msg)
            console.log(errorMessages)
            return res.status(400).json({
                errors: errors.array(),
                message: errorMessages
            })
        }
        const service = new Post({
            title: req.body.title,
            text: req.body.text,
            files: req.body.files,
            author: req.user.userId
        })
        try {
            await service.save();
            await res.status(201).json({ service })
    } catch (e) {
            console.log(e)
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/', async (req, res) => {
    try {
        let noMatch = null;
        if(req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            // Get all posts from DB
            Post.find({title: regex}, function(err, posts){
                if(err){
                    console.log(err);
                } else {
                    if(posts.length < 1) {
                        noMatch = "Ни одного поста не найдено";
                    }
                    res.json({ posts, noMatch })
                }
            });
        } else {
            Post.find({}, function(err, posts){
                if(err){
                    console.log(err);
                } else {
                    res.json({ posts, noMatch })
                }
            });
        }



        const posts = await Post.find()
        await res.json(posts)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments')
        await res.json(post)
    } catch (e) {
        await res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;