const sequelize = require('../config/connection');
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET route to homepage
router.get('/', (req, res) => {
    
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

module.exports = router;

