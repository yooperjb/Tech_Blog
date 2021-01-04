const router = require('express').Router();
//const { endsWith } = require('sequelize/types/lib/operators');
const { User, Post, Comment } = require('../../models');

// GET /api/users - all users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1 - single user
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }, 
        include: [
            // include Post model
            {
                model: Post,
                attributes: ['id', 'title','post_text', 'created_at']
            },
            // include Comment model
            {
                model: Comment,
                attributes: ['id', 'comment_text','created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users - create new user
router.post('/', (req,res) => {
    // expects {username:'', email:'', password:''}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            // get session information
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST login route /api/users/login
router.post('/login', (req, res) => {
    // expect {email: '', password: ''}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        // if user email not found
        if(!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // verify user using method from User model - returns true if PW match
        const validPassword = dbUserData.checkPassword(req.body.password);

        // if password does not match
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            // if password match
            res.json({ user: dbUserData, message: 'You are now logged in! '});
        });
    });
});

// POST logout route /api/users/logout
router.post('/logout', (req, res) => {
    // if session exists destroy it
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1 - edit user
router.put('/:id', (req,res) => {
     // expects {username:'', email:'', password:''}
     // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
     User.update(req.body, {
        // required for using beforeUpdate Hook 
        individualHooks: true,
         where: {
             id: req.params.id
         }
     })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            // if user exists
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1 - delete single user
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;