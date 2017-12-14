var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Mypic = mongoose.model('Mypic'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app, config) {
    app.use('/api', router);

router.get('/mypics/gallery/:galleriesId', function (req, res, next) {
    logger.log('Get all mypics for ' + req.params.userId, 'verbose');
    Mypic.find({ galleryId: req.params.galleriesId })
        .then(Mypics => {
            if (Mypics) {
                res.status(200).json(Mypics);
            } else {
                return next(error);
            }
        });
});

router.route('/mypics').get(function (req, res, next) {
    logger.log('Get all mypics', 'verbose');

    var query = Mypic.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
            if (result && result.length) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'No mypics' });
            }
        })
        .catch(err => {
            return next(err);
        });
})

router.route('/mypics/mypic').get(requireAuth, function (req, res, next) {
    logger.log('Get mypic' + req.params.Mypic, 'verbose');

    Mypic.findById(req.params.Mypic)
        .then(Mypic => {
            if (Mypic) {
                res.status(200).json(Mypic);
            } else {
                res.status(404).json({ message: "No mypic found" });
            }
        })
        .catch(error => {
            return next(error);
        });
});

router.route('/mypics').post(requireAuth, function (req, res, next) {
    logger.log('Create mypic', 'verbose');

    var mypic = new Mypic(req.body);
    mypic.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });
})

router.route('/mypics/mypic').put(requireAuth, function (req, res, next) {
    logger.log('Update mypic', 'verbose');

    Mypic.findOneAndUpdate({ _id: req.params.mypic },
        req.body, { new: true, multi: false })
        .then(Mypic => {
            res.status(200).json(mypic);
        })
        .catch(error => {
            return next(error);
        });
});


router.route('/mypics/mypic').delete(requireAuth, function (req, res, next) {
    logger.log('Delete mypic', 'verbose');

    Mypic.remove({ _id: req.params.mypic })
        .then(Mypic => {
            res.status(200).json({ msg: "mypic Deleted" });
        })
        .catch(error => {
            return next(error);
        });
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = config.uploads + req.params.userId + "/";
        mkdirp(path, function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.');
        cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    }
});

var upload = multer({ storage: storage });

router.post('/mypics/upload/:userId/:mypicId', upload.any(), function (req, res, next) {
    logger.log('Upload file for mypic ' + req.params.mypicId + ' and ' + req.params.userId, 'verbose');

    Mypic.findById(req.params.mypicId, function (err, mypic) {
        if (err) {
            return next(err);
        } else {
            if (req.files) {
                mypic.file = {
                    filename: req.files[0].filename,
                    originalName: req.files[0].originalname,
                    dateUploaded: new Date()
                };
            }
            mypic.save()
                .then(mypic => {
                    res.status(200).json(mypic);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});
};