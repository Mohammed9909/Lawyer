// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for blog
const blog = require('../models/blog');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/blog
 * Description: Get All blogs
 */
router.get('/api/blog', (req, res) => {
    blog.find()
        // Return all blogs as an Array
        .then((blogs) => {
            res.status(200).json({ blogs: blogs });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});

/**
* Action:       SHOW
* Method:       GET
* URI:          /api/blogs/5d664b8b68b4f5092aba18e9
* Description:  Get An blog by blog ID
*/

router.get('/api/blogs/:id', (req, res) => {
    blog.findById(req.params.id)
        .then((blog) => {
            if (blog) {
                //Pass the result of Mongoose's `.get` method to the next `.then`
                res.status(200).send(blog);
            } else {
                //if we couldn't find a document with matching ID
                res.status(404).json({
                    error: {
                        name: 'Document Not Found Error',
                        message: 'The provided ID doesn\'t match any document'
                    }
                })
            }
        })
        //catch any error that might accur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/blogs
 * Description: Create a new blog
*/

router.post('/api/blogs', (req, res) => {
    blog.create(req.body.blog)
        // On a successful `create` action, respond with 201
        // HTTP status and the content of the new blog.
        .then((newblog) => {
            res.status(201).json({ blog: newblog });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:          /api/blogs/5d664b8b68b4f5092aba18e9
 * Description:  Update An blog by blog ID
 */

router.patch('/api/blogs/:id', (req, res) => {
    blog.findById(req.params.id)
        .then((blog) => {
            if (blog) {
                //Pass the result of Mongoose's `.update` method to the next `.then`

                return blog.update()
            } else {
                //if we couldn't find a document with matching ID
                res.status(404).json({
                    error: {
                        name: 'Document Not Found Error',
                        message: 'The provided ID doesn\'t match any document'
                    }
                })
            }
        })
        .then((blog) => {
            //if the update succeeded, return 204 and no JSON
            res.status(200).send(blog);
        })
        //catch any error that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:          /api/blogs/5d664b8b68b4f5092aba18e9
 * Description: Delete An blog by blog ID
 */

router.delete('/api/blogs/:id', (req, res) => {
    blog.findById(req.params.id)
        .then((blog) => {
            if (blog) {
                //Pass the result of mongoose's .delete
                return blog.remove();

            } else {
                // If we couldn't find a dicument with matching ID
                res.status(404).json({
                    error: {
                        name: 'Document Not Found Error',
                        message: 'The provided ID doesn\'t match any documents'
                    }
                })
            }
        })

        .then(() => {
            //If the deleting succeeded, return 204 and no JSON
            res.status(204).end();
        })

        // Chatch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error })
        })
})

// Export the Router so we can use it in the server.js file
module.exports = router;