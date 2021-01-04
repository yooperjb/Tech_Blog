const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET route to homepage
router.get('/', (req, res) => {
    // log session variables
    //console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //console.log(dbPostData[0]);
            // loop through and serialize all posts
            const posts = dbPostData.map(post => post.get({ plain: true }));
            
            // render homepage.handlebars with posts
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET route login page
router.get('/login', (req, res) => {
    // if session exists redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // if no session render login page
    res.render('login');
});

module.exports = router;

