var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    mypics = mongoose.model('mypics'),
    passportService = require('../../config/passport'),
    passport = require ('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });
    

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/mypics/user/:userId', function(req, res, next){
        logger.log('Get all mypics for ' + req.params.userId, 'verbose');
    
        mypic.find({user: req.params.userId})
                    .then(mypics => {
                                if(mypics){
                                            res.status(200).json(mypics);
                                } else {
                                            return next(error);
                                }
                    });
    });
    
    router.route('/mypics').get(requireAuth,function(req, res, next){
        logger.log('Get all mypics', 'verbose');
        
        var query = mypic.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                    if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: 'No mypics'}); 
                }
        })
        .catch(err => {
            return next(err);
        });
    })
    
    router.route('/mypics/mypic').get(requireAuth,function(req, res, next){
        logger.log('Get mypic' + req.params.mypic, 'verbose');
         
         mypic.findById(req.params.mypic)
                    .then(mypic => {
                        if(mypic){
                            res.status(200).json(mypic);
                        } else {
                            res.status(404).json({message: "No mypic found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
        
    router.route('/mypics').post(requireAuth,function(req, res, next){
        logger.log('Create mypic', 'verbose');
      
        var mypic = new mypic(req.body);
            mypic.save()
                .then(result => {
                    res.status(201).json(result);
                })
            .catch( err => {
                return next(err);
            });
      })
    
    router.route('/mypics/mypic').put(requireAuth,function(req, res, next){
        logger.log('Update mypic', 'verbose');
        
        mypic.findOneAndUpdate({_id: req.params.mypic}, 		
            req.body, {new:true, multi:false})
                .then(mypic => {
                    res.status(200).json(mypic);
                })
                .catch(error => {
                    return next(error);
                });
        });
    
    
    router.route('/mypics/mypic').delete(requireAuth,function(req, res, next){
        logger.log('Delete mypic', 'verbose');
        
        mypic.remove({ _id: req.params.mypic })
                .then(mypic => {
                    res.status(200).json({msg: "mypic Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
        });
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {      
                  var path = config.uploads + req.params.userId + "/";
                mkdirp(path, function(err) {
                    if(err){
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
            
          router.post('/mypics/upload/:userId/:mypicId', upload.any(), function(req, res, next){
                logger.log('Upload file for mypic ' + req.params.mypicId + ' and ' + req.params.userId, 'verbose');
                
                mypic.findById(req.params.mypicId, function(err, mypic){
                    if(err){ 
                        return next(err);
                    } else {     
                        if(req.files){
                            mypic.file = {
                                filename : req.files[0].filename,
                                originalName : req.files[0].originalname,
                                dateUploaded : new Date()
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