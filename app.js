const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/posts.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/services', require('./routes/services.routes'))
app.use('/api/comments', require('./routes/comments.routes'))
app.use('/api/review', require('./routes/review.routes'))

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on PORT: ${PORT}...`);
        })
    } catch (e) {
        console.log('Server error', e);
        process.exit(1)
    }
}

start()

