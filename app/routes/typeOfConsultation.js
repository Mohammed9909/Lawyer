// Require necessary NPM Packages
const express = require('express');
// Require Mongoose Model for Type Of Consultation
const TypeOfConsultation = require('../models/typeOfConsultation');
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/typeOfConsultation
 * Description: Get All Type Of Consultation
 */
router.get('/api/typeOfConsultation', (req, res) => {
    TypeOfConsultation.find()
        // Return all typeOfConsultation as an Array
        .then((typeOfConsultations) => {
            res.status(200).json({ typeOfConsultations: typeOfConsultations });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
* Action:       SHOW
* Method:       GET
* URI:          /api/typeOfConsultation/5d664b8b68b4f5092aba18e9
* Description:  Get An Type Of Consultation by Type Of Consultation ID
*/
router.get('/api/typeOfConsultations/:id', (req, res) => {
    TypeOfConsultation.findById(req.params.id)
        .then((typeOfConsultation) => {
            if (typeOfConsultation) {
                //Pass the result of Mongoose's `.get` method to the next `.then`
                res.status(200).send(typeOfConsultation);
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
 * URI:         /api/typeOfConsultation
 * Description: Create a new Type Of Consultation
*/
router.post('/api/typeOfConsultations', (req, res) => {
    TypeOfConsultation.create(req.body.typeOfConsultation)
        // On a successful `create` action, respond with 201
        // HTTP status and the content of the new type Of Consultation.
        .then((newtypeOfConsultation) => {
            res.status(201).json({ typeOfConsultation: newtypeOfConsultation });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});
/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:          /api/typeOfConsultation/5d664b8b68b4f5092aba18e9
 * Description:  Update An type Of Consultation by type Of Consultation ID
 */
router.patch('/api/typeOfConsultations/:id', (req, res) => {
    TypeOfConsultation.findById(req.params.id)
        .then((typeOfConsultation) => {
            if (typeOfConsultation) {
                //Pass the result of Mongoose's `.update` method to the next `.then`

                return typeOfConsultation.update(req.body.typeOfConsultation)
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
        .then((typeOfConsultation) => {
            //if the update succeeded, return 204 and no JSON
            res.status(200).send(typeOfConsultation);
        })
        //catch any error that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        })
})
/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:          /api/typeOfConsultation/5d664b8b68b4f5092aba18e9
 * Description: Delete An typeOfConsultation by Type Of Consultation ID
 */
router.delete('/api/typeOfConsultations/:id', (req, res) => {
    TypeOfConsultation.findById(req.params.id)
        .then((typeOfConsultation) => {
            if (typeOfConsultation) {
                //Pass the result of mongoose's .delete
                return typeOfConsultation.remove();
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