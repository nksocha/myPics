define('app',['exports', 'aurelia-framework', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }, {
        route: 'galleries',
        moduleId: './modules/galleries',
        name: 'Galleries',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources').plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    });

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/galleries',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/galleries', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _galleries, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GalleriesList = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GalleriesList = exports.GalleriesList = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _galleries.Galleries, _aureliaAuth.AuthService), _dec(_class = function () {
    function GalleriesList(router, galleries, auth) {
      _classCallCheck(this, GalleriesList);

      this.galleries = galleries;
      this.router = router;
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.title = "These are you galleries!";
      this.showGalleries = true;
    }

    GalleriesList.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
      this.router.navigate('home');
    };

    GalleriesList.prototype.createGalleries = function createGalleries() {
      this.galleriesObj = {
        galleries: '',
        description: '',
        userId: this.user._id
      };
      this.showGalleries = false;
    };

    GalleriesList.prototype.saveGalleries = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.galleriesObj) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.galleries.save(this.galleriesObj);

              case 3:
                response = _context.sent;

                if (response.error) {
                  alert('There was an error creating the Galleries');
                } else {}

              case 5:
                this.showGalleries = true;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveGalleries() {
        return _ref.apply(this, arguments);
      }

      return saveGalleries;
    }();

    GalleriesList.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.galleries.getUserGalleries(this.user._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    GalleriesList.prototype.editGalleries = function editGalleries(galleries) {
      this.galleriesObj = galleries;
      this.showGalleries = false;
    };

    GalleriesList.prototype.deleteGalleries = function deleteGalleries(galleries) {
      this.galleries.deleteGalleries(galleries._id);
    };

    GalleriesList.prototype.back = function back() {
      this.showGalleries = true;
    };

    GalleriesList.prototype.showGalleriesOrAdd = function showGalleriesOrAdd(galleries) {
      sessionStorage.setItem("galleries", JSON.stringify(galleries));
      this.router.navigate('list');
    };

    return GalleriesList;
  }()) || _class);
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.users = users;
      this.message = 'My Pics Home';
      this.showLogin = true;
      this.auth = auth;
      this.loginError = '';
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('galleries');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/mypics', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _mypics, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MypicGalleries = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MypicGalleries = exports.MypicGalleries = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _mypics.Mypics, _aureliaAuth.AuthService), _dec(_class = function () {
    function MypicGalleries(router, mypic, auth) {
      _classCallCheck(this, MypicGalleries);

      this.mypic = mypic;
      this.router = router;
      this.auth = auth;
      this.galleries = JSON.parse(sessionStorage.getItem('galleries'));
      this.editMypic2 = JSON.parse(sessionStorage.getItem('mypic'));
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showMypics = true;
    }

    MypicGalleries.prototype.saveMypic = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response, mypicId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.mypicsObj) {
                  _context.next = 13;
                  break;
                }

                _context.next = 3;
                return this.mypic.save(this.mypicsObj);

              case 3:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 8;
                  break;
                }

                alert('There was an error uploading the Photo');
                _context.next = 13;
                break;

              case 8:
                mypicId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return this.mypic.uploadFile(this.filesToUpload, this.galleries._id, mypicId);

              case 12:
                this.filesToUpload = [];

              case 13:

                this.showMypics = true;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveMypic() {
        return _ref.apply(this, arguments);
      }

      return saveMypic;
    }();

    MypicGalleries.prototype.createMypic = function createMypic() {
      this.mypicsObj = {
        mypic: '',
        description: '',
        userId: this.user._id,
        galleryId: this.galleries._id
      };
      this.showMypics = false;
    };

    MypicGalleries.prototype.activate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.mypic.getUserMypic(this.galleries._id);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function activate() {
        return _ref2.apply(this, arguments);
      }

      return activate;
    }();

    MypicGalleries.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    MypicGalleries.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    MypicGalleries.prototype.deleteMypic = function deleteMypic(mypic) {
      this.mypic.deleteMypic(mypic._id);
    };

    MypicGalleries.prototype.editMypic = function editMypic(mypic) {
      this.mypicsObj = mypic;
      this.showMypics = false;
    };

    MypicGalleries.prototype.saveEditedMypic = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.mypicObj2) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 3;
                return this.mypic.saveEdited(this.mypicObj2);

              case 3:
                response = _context3.sent;

                if (response.error) {
                  alert('There was an error updating the photo details');
                } else {}

              case 5:
                this.showMypics = true;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveEditedMypic() {
        return _ref3.apply(this, arguments);
      }

      return saveEditedMypic;
    }();

    MypicGalleries.prototype.back = function back() {
      this.router.navigate('galleries');
    };

    MypicGalleries.prototype.back2 = function back2() {
      this.showMypics = true;
    };

    return MypicGalleries;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";

			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			console.log(content);
			console.log(url);
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Galleries = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Galleries(data) {
            _classCallCheck(this, Galleries);

            this.data = data;
            this.GALLERIES_SERVICE = 'galleries';
            this.galleriesArray = [];
        }

        Galleries.prototype.getUserGalleries = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.GALLERIES_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.galleriesArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserGalleries(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserGalleries;
        }();

        Galleries.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(galleries) {
                var response, _response;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!galleries) {
                                    _context2.next = 14;
                                    break;
                                }

                                if (galleries._id) {
                                    _context2.next = 9;
                                    break;
                                }

                                _context2.next = 4;
                                return this.data.post(galleries, this.GALLERIES_SERVICE);

                            case 4:
                                response = _context2.sent;

                                if (!response.error) {
                                    this.galleriesArray.push(response);
                                }
                                return _context2.abrupt('return', response);

                            case 9:
                                _context2.next = 11;
                                return this.data.put(galleries, this.GALLERIES_SERVICE + "/" + galleries._id);

                            case 11:
                                _response = _context2.sent;

                                if (!_response.error) {}
                                return _context2.abrupt('return', _response);

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        Galleries.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, galleriesId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.GALLERIES_SERVICE + "/upload/" + userId + "/" + GalleriesId);

                            case 4:
                                response = _context3.sent;
                                return _context3.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        Galleries.prototype.deleteGalleries = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.delete(this.GALLERIES_SERVICE + "/" + id);

                            case 2:
                                response = _context4.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.galleriesArray.length; i++) {
                                        if (this.galleriesArray[i]._id === id) {
                                            this.galleriesArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function deleteGalleries(_x6) {
                return _ref4.apply(this, arguments);
            }

            return deleteGalleries;
        }();

        return Galleries;
    }()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Mypics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Mypics = exports.Mypics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Mypics(data) {
            _classCallCheck(this, Mypics);

            this.data = data;
            this.MYPIC_SERVICE = 'mypics';
            this.GALLERIES_SERVICE = 'galleries';
            this.mypicsArray = [];
        }

        Mypics.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mypic) {
                var response, _response;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!mypic) {
                                    _context.next = 14;
                                    break;
                                }

                                if (mypic._id) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 4;
                                return this.data.post(mypic, this.MYPIC_SERVICE);

                            case 4:
                                response = _context.sent;

                                if (!response.error) {
                                    this.mypicsArray.push(response);
                                }
                                return _context.abrupt('return', response);

                            case 9:
                                _context.next = 11;
                                return this.data.put(mypic, this.GALLERIES_SERVICE + "/" + this.MYPIC_SERVICE + "/" + mypic._id);

                            case 11:
                                _response = _context.sent;

                                if (!_response.error) {}
                                return _context.abrupt('return', _response);

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        Mypics.prototype.uploadFile = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files, galleriesId, mypicId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });
                                _context2.next = 4;
                                return this.data.uploadFiles(formData, this.MYPIC_SERVICE + "/upload/" + galleriesId + "/" + mypicId);

                            case 4:
                                response = _context2.sent;
                                return _context2.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function uploadFile(_x2, _x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return uploadFile;
        }();

        Mypics.prototype.getUserMypic = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(galleriesId) {
                var response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.get(this.MYPIC_SERVICE + "/gallery/" + galleriesId);

                            case 2:
                                response = _context3.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getUserMypic(_x5) {
                return _ref3.apply(this, arguments);
            }

            return getUserMypic;
        }();

        Mypics.prototype.deleteMypic = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.delete(this.MYPIC_SERVICE + "/" + id);

                            case 2:
                                response = _context4.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function deleteMypic(_x6) {
                return _ref4.apply(this, arguments);
            }

            return deleteMypic;
        }();

        Mypics.prototype.saveEdited = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(mypic) {
                var response;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!mypic) {
                                    _context5.next = 6;
                                    break;
                                }

                                _context5.next = 3;
                                return this.data.put(mypic, this.GALLERIES_SERVICE + "/" + this.MYPIC_SERVICE + "/" + mypic._id);

                            case 3:
                                response = _context5.sent;

                                if (!response.error) {}
                                return _context5.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function saveEdited(_x7) {
                return _ref5.apply(this, arguments);
            }

            return saveEdited;
        }();

        return Mypics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CompletedValueConverter = exports.CompletedValueConverter = function () {
        function CompletedValueConverter() {
            _classCallCheck(this, CompletedValueConverter);
        }

        CompletedValueConverter.prototype.toView = function toView(array, value) {
            if (!value) {
                return array.filter(function (item) {
                    return !item.completed;
                });
            } else {
                return array;
            }
        };

        return CompletedValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DateFormatValueConverter = undefined;

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
		function DateFormatValueConverter() {
			_classCallCheck(this, DateFormatValueConverter);
		}

		DateFormatValueConverter.prototype.toView = function toView(value) {
			if (value === undefined || value === null) {
				return;
			}

			return (0, _moment2.default)(value).format('MMM Do YYYY');
		};

		return DateFormatValueConverter;
	}();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!modules/galleries.html', ['module'], function(module) { module.exports = "<template><h2>${user.firstName}'s Mypics</h2><compose show.bind=\"showGalleries\" view=\"./components/galleriesList.html\"></compose><compose show.bind=\"!showGalleries\" view=\"./components/galleriesForm.html\"></compose></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin{\r\n    margin-right: 10px\r\n}\r\n\r\n.toptMargin{\r\n    margin-right: 10px\r\n}"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><nav class=\"navbar navbar-light bg-light\"><span class=\"navbar-brand mb-0 h1\">Navbar</span></nav><h1>${message}</h1>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><h2>${user.firstName}'s Mypics</h2><compose show.bind=\"showMypics\" view=\"./components/mypicList.html\"></compose><compose show.bind=\"!showMypics\" view=\"./components/mypicForm.html\"></compose></template>"; });
define('text!modules/components/galleriesForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"></div></div><form><div class=\"form-group topMargin\"><label for=\"galleriesInput\">Galleries Name *</label><input value.bind=\"galleriesObj.galleries\" type=\"text\" class=\"form-control\" id=\"galleriesInput\" aria-describedby=\"galleriesHelp\" placeholder=\"Enter Galleries Name\"> <small id=\"galleriesHelp\" class=\"form-text text-muted\">A short name for the galleries.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"galleriesObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"createDateInput\">Date Created *</label><flat-picker value.bind=\"galleriesObj.dateCreate\"></flat-picker><small id=\"createDateHelp\" class=\"form-text text-muted\">The date to galleries is created.</small></div></form></div><button click.trigger=\"saveGalleries()\" class=\"btn btn-primary topMargin\">Save</button></template>"; });
define('text!modules/components/galleriesList.html', ['module'], function(module) { module.exports = "<template><h1 class=\"center\">Welcome to your Galleries</h1><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createGalleries()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"galleries.galleriesArray.length\"><table class=\"table\"><thead><tr><th>Galleries Name</th><th>Date Created</th><th>Description</th><th>Edit | Delete</th></tr></thead><tbody><tr repeat.for=\"galleries of galleries.galleriesArray\"><th><button click.trigger=\"showGalleriesOrAdd(galleries)\" class=\"btn btn-primary\">${galleries.galleries}</button></th><td>${galleries.dateCreated | dateFormat}</td><td>${galleries.description}</td><td><i click.trigger=\"editGalleries(galleries)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGalleries(galleries)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!galleries.galleriesArray.length\"><h2>Apparently, you don't have galleries. Lets start one now!</h2></div></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template>    <div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div>    <label for=\"email\">Email</label>    <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\">    <label for=\"password\">Password</label>    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\">    <button click.trigger=\"login()\">Login</button>       <span class=\"registerLink\" click.trigger=\"showRegister()\">Register</span></template>"; });
define('text!modules/components/mypicForm.html', ['module'], function(module) { module.exports = "<template><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"mypicInput\">mypic *</label><input value.bind=\"mypicsObj.mypic\" type=\"text\" class=\"form-control\" id=\"mypicInput\" aria-describedby=\"mypicHelp\" placeholder=\"Enter mypic\"> <small id=\"mypicHelp\" class=\"form-text text-muted\">A short name for the picture.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"mypicsObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload any files that will be useful.</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name} <span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"saveMypic()\" class=\"btn btn-primary topMargin\">Save</button></div></form></template>"; });
define('text!modules/components/mypicList.html', ['module'], function(module) { module.exports = "<template><h1 class=\"center\">Pictures</h1><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"createMypic()\" class=\"fa fa-camera\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"mypic.mypicsArray.length\"><table class=\"table\"><thead><tr><th>Photo</th><th>MyPic</th><th>Description</th><th>Edit</th></tr></thead><tbody><tr repeat.for=\"mypic of mypic.mypicsArray\"><td><a href=\"uploads/${galleries._id}/${mypic.file.filename}\" target=\"_blank\"><img src=\"http://localhost:5000/uploads/${user._id}/${mypic.file.fileName}\" alt=\"${mypic.file.originalName} \" class=\"img-thumbnail\" style=\"width:150px\"></a></td><td>${mypic.mypic} </td><td>${mypic.description}</td><td><i click.trigger=\"editMypic(mypic)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteMypic(mypic)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!mypic.mypicsArray.length\"><h2>Apparently, you don't have any photos! Add some now!</h2></div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>    First Name: <input value.bind=\"user.firstName\">     Last Name: <input value.bind=\"user.lastName\">     Email: <input value.bind=\"user.email\">     Password: <input value.bind=\"user.password\">     <button click.trigger=\"save()\">Save</button></template>"; });
//# sourceMappingURL=app-bundle.js.map