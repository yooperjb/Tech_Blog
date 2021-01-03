const router = require('express').Router();
// need both Post and User models (user makes a post)
const { Post, User } = require('../../models');

// GET /api/posts - all posts
router.get('/', (req,res) => {
    console.log('===============');
    Post.findAll({
        attributes: ['id','title','post_text','created_at' ],
        // sort by created_at date/time
        order:[['created_at', 'DESC']],
        include: [
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
router.post('/', (req,res) => {
    // expects {title:'',post_text:'', user_id:'' }
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts:id - update post information
router.put('/:id', (req,res) => {
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
router.delete('/:id', (req,res) => {
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