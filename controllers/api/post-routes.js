const router = require('express').Router();
// need both Post and User models (user makes a post)
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts - all posts
router.get('/', (req,res) => {
    console.log('===============');
    Post.findAll({
        // sort by created_at date/time
        order:[['created_at', 'DESC']],
        attributes: ['id','title','post_text','created_at' ],
        include: [
            // include post comments
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            }
        ],
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/posts/:id - get one post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','title','post_text','created_at' ],
        include: [
             // include post comments
             {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this ID' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/posts - create new post
router.post('/',withAuth, (req,res) => {
    // expects {title:'',post_text:'', user_id:'' } gets user_id from logged in user session
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts:id - update post information
router.put('/:id',withAuth, (req,res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: "No post found with this ID" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/posts:id - delete a single post
router.delete('/:id',withAuth, (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        // if post is not found
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }
        // if post found return
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;