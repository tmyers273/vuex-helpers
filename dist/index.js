(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["tmyers273.vuex-helpers"] = factory(require("vue"));
	else
		root["tmyers273.vuex-helpers"] = factory(root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (config) {
    return {
        actions: {
            create: function create(store, data) {
                return new Promise(function (resolve, reject) {
                    config.http().post(config.create.url, data).then(function (response) {
                        store.commit('push', config.getResponseData(response).data);
                        resolve(response);
                    }, function (response) {
                        reject(response);
                    });
                });
            },
            edit: function edit(store, data) {
                return new Promise(function (resolve, reject) {
                    config.http().post(config.edit.url, data).then(function (response) {
                        resolve(response);
                    }, function (response) {
                        reject(response);
                    });
                });
            },
            load: function load(store) {
                if (!store.getters.hasData) {
                    store.commit('loading', true);
                    config.http().get(config.load.url).then(function (response) {
                        store.commit('save', config.getResponseData(response));
                        store.commit('loading', false);
                        store.commit('hasData', true);
                    }, function (response) {
                        store.commit('loading', false);
                    });
                }
            },
            delete: function _delete(store, id) {
                return new Promise(function (resolve, reject) {
                    config.http().post(config.destroy.url, config.destroy.params(id)).then(function (response) {
                        store.commit('destroy', id);
                        resolve(response);
                    }).catch(function (response) {
                        reject(response);
                    });
                });
            }
        },

        getters: {
            count: function count(state) {
                return state.count;
            },


            elements: function elements(state) {
                return function () {
                    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
                    var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

                    var start = (page - 1) * perPage;
                    return state.elements.slice(start, start + perPage);
                };
            },

            find: function find(state) {
                return function (id) {
                    var element = state.elements.find(function (element) {
                        if (element) {
                            return element.id == id;
                        }
                    });

                    if (!element) {
                        element = config.default;
                    }

                    return element;
                };
            },

            hasData: function hasData(state) {
                return state.hasData;
            },

            isLoading: function isLoading(state) {
                return state.status.loading;
            }
        },

        mutations: {
            clear: function clear(state) {
                state.elements = [];
                state.hasData = false;
            },

            destroy: function destroy(state, id) {
                var index = state.elements.findIndex(function (element) {
                    return element.id == id;
                });
                state.elements.splice(index, 1);
                state.count--;
            },

            edit: function edit(state, new_element) {
                var index = state.elements.findIndex(function (element) {
                    return element.id == new_element.id;
                });
                state.elements.splice(index, 1, new_element);
            },

            hasData: function hasData(state, value) {
                state.hasData = value;
            },

            loading: function loading(state, value) {
                state.status.loading = value;
            },

            save: function save(state, response) {
                state.count = response.meta.count;
                state.elements = response.data;
            },

            push: function push(state, element) {
                state.elements.push(element);
                state.count++;
            }
        },

        state: {
            hasData: false,

            count: 0,
            elements: [],

            status: {
                loading: false
            }
        }

    };
};

var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map