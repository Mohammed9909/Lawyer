// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for consultation
const Consultation = require('../models/consultation');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/consultation
 * Description: Get All Consultations
 */
router.get('/api/consultation', (req, res) => {
    Consultation.find()
        // Return all Consultations as an Array
        .then((consultations) => {
            res.status(200).json({ consultations: consultations });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
* Action:       SHOW
* Method:       GET
* URI:          /api/consultations/5d664b8b68b4f5092aba18e9
* Description:  Get An Consultation by Consultation ID
*/
router.get('/api/consultations/:id', (req, res) => {
    Consultation.findById(req.params.id)
        .then((consultation) => {
            if (consultation) {
                //Pass the result of Mongoose's `.get` method to the next `.then`
                res.status(200).send(consultation);
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
 * URI:         /api/consultations
 * Description: Create a new consultation
*/
router.post('/api/consultations', (req, res) => {
    Consultation.create(req.body.consultation)
        // On a successful `create` action, respond with 201
        // HTTP status and the content of the new consultation.
        .then((newconsultation) => {
            res.status(201).json({ consultation: newconsultation });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:          /api/consultations/5d664b8b68b4f5092aba18e9
 * Description:  Update An Consultation by Consultation ID
 */
router.patch('/api/consultations/:id', (req, res) => {
    Consultation.findById(req.params.id)
        .then((consultation) => {
            if (consultation) {
                //Pass the result of Mongoose's `.update` method to the next `.then`

                return consultation.update()
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
        .then((consultation) => {
            //if the update succeeded, return 204 and no JSON
            res.status(200).send(consultation);
        })
        //catch any error that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:          /api/consultations/5d664b8b68b4f5092aba18e9
 * Description: Delete An Consultation by Consultation ID
 */

router.delete('/api/consultations/:id', (req, res) => {
    Consultation.findById(req.params.id)
        .then((consultation) => {
            if (consultation) {
                //Pass the result of mongoose's .delete
                return consultation.remove();

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