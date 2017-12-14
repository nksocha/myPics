var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Galleries = mongoose.model('Galleries');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/galleries/user/:userId', function (req, res, next) {
        logger.log('Get Galleries' + req.params.userId, 'verbose');
        Galleries.find({ userId: req.params.userId })
            .then(galleries => {
                if (galleries) {
                    res.status(200).json(galleries);
                } else {
                    res.status(404).json({ message: "No Galleries" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });

    router.post('/galleries', function (req, res, next) {
        logger.log('Create a Galleries', 'verbose');
        var galleries = new Galleries(req.body);
        galleries.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            })
    });

    router.put('/galleries/:galleriesId', function (req, res, next) {
        logger.log('Update Galleries', + req.params.galleriesId, 'verbose');
        Galleries.findOneAndUpdate({ _id: req.params.galleriesId }, req.body, { new: true, multi: false })
            .then(galleries => {
                res.status(200).json(galleries);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/galleries/:galleriesId', function (req, res, next) {
        logger.log('Delete this Galleries', + req.params.galleriesId, 'verbose');
        Galleries.remove({ _id: req.params.galleriesId })
            .then(user => {
                res.status(200).json({ msg: "Galleries Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });
}