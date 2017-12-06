var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'myPics'    },    
            port: 5000,  
            db: 'mongodb://127.0.0.1/mypics-dev',
            secret: "cayennedlikedhistreats",
            uploads: rootPath + "/public/uploads/",
            
            
},  
 production: {    
              root: rootPath,    
              app: {      name: 'myPics'    },    
               port: 80,  },
               db: 'mongodb://127.0.0.1/mypics',
               secret: "cayennedlikedhistreats",
               uploads: rootPath + "/public/uploads/",
               
  };

module.exports = config[env];