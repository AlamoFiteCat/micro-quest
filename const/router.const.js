const router = require('express').Router();
const auth = require('../routes/auth.routes');
const heroes = require('../routes/heroes.routes');
const story = require('../routes/story.routes');

router.use('/auth', auth);
router.use('/heroes', heroes);
router.use('/story', story);

module.exports = router;
