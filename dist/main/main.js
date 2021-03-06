module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var filename = require("path").join(__dirname, "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		require("fs").readFile(filename, "utf-8", function(err, content) {
/******/ 			if (err) {
/******/ 				if (__webpack_require__.onError) return __webpack_require__.oe(err);
/******/ 				throw err;
/******/ 			}
/******/ 			var chunk = {};
/******/ 			require("vm").runInThisContext(
/******/ 				"(function(exports) {" + content + "\n})",
/******/ 				{ filename: filename }
/******/ 			)(chunk);
/******/ 			hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		var filename = require("path").join(__dirname, "" + hotCurrentHash + ".hot-update.json");
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			require("fs").readFile(filename, "utf-8", function(err, content) {
/******/ 				if (err) return resolve();
/******/ 				try {
/******/ 					var update = JSON.parse(content);
/******/ 				} catch (e) {
/******/ 					return reject(e);
/******/ 				}
/******/ 				resolve(update);
/******/ 			});
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "627ea167f4235a649dce";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _electronDevtoolsInstaller() {\n  const data = _interopRequireWildcard(__webpack_require__(/*! electron-devtools-installer */ \"electron-devtools-installer\"));\n\n  _electronDevtoolsInstaller = function () {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\n// install vue-devtools\n__webpack_require__(/*! electron */ \"electron\").app.on(\"ready\", () => {\n  (0, _electronDevtoolsInstaller().default)(_electronDevtoolsInstaller().VUEJS_DEVTOOLS).catch(error => {\n    console.log(\"Unable to install `vue-devtools`: \\n\", error);\n  });\n}); \n// __ts-babel@6.0.4\n//# sourceMappingURL=vue-main-dev-entry.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24td2VicGFjay9vdXQvY29uZmlndXJhdG9ycy92dWUvdnVlLW1haW4tZGV2LWVudHJ5LmpzP2FlZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQSx1Q0FBdUMsbUJBQU8sQ0FBQyxnRUFBNkI7O0FBRTVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1Qyw2QkFBNkIsWUFBWSxFQUFFLE9BQU8saUJBQWlCLG1CQUFtQix1QkFBdUIsc0RBQXNELHNIQUFzSCw0QkFBNEIsMENBQTBDLEVBQUUsT0FBTyx3QkFBd0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsZUFBZSxFQUFFOztBQUV0ZDtBQUNBLG1CQUFPLENBQUMsMEJBQVU7QUFDbEI7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDLEU7QUFDRDtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXdlYnBhY2svb3V0L2NvbmZpZ3VyYXRvcnMvdnVlL3Z1ZS1tYWluLWRldi1lbnRyeS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfZWxlY3Ryb25EZXZ0b29sc0luc3RhbGxlcigpIHtcbiAgY29uc3QgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXJcIikpO1xuXG4gIF9lbGVjdHJvbkRldnRvb2xzSW5zdGFsbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IHt9OyBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbi8vIGluc3RhbGwgdnVlLWRldnRvb2xzXG5yZXF1aXJlKFwiZWxlY3Ryb25cIikuYXBwLm9uKFwicmVhZHlcIiwgKCkgPT4ge1xuICAoMCwgX2VsZWN0cm9uRGV2dG9vbHNJbnN0YWxsZXIoKS5kZWZhdWx0KShfZWxlY3Ryb25EZXZ0b29sc0luc3RhbGxlcigpLlZVRUpTX0RFVlRPT0xTKS5jYXRjaChlcnJvciA9PiB7XG4gICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gaW5zdGFsbCBgdnVlLWRldnRvb2xzYDogXFxuXCIsIGVycm9yKTtcbiAgfSk7XG59KTsgXG4vLyBfX3RzLWJhYmVsQDYuMC40XG4vLyMgc291cmNlTWFwcGluZ1VSTD12dWUtbWFpbi1kZXYtZW50cnkuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js\n");

/***/ }),

/***/ "./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js":
/*!*************************************************************************!*\
  !*** ./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! source-map-support/source-map-support.js */ \"source-map-support/source-map-support.js\").install();\n\nconst socketPath = process.env.ELECTRON_HMR_SOCKET_PATH;\n\nif (socketPath == null) {\n  throw new Error(`[HMR] Env ELECTRON_HMR_SOCKET_PATH is not set`);\n} // module, but not relative path must be used (because this file is used as entry)\n\n\nconst HmrClient = __webpack_require__(/*! electron-webpack/out/electron-main-hmr/HmrClient */ \"electron-webpack/out/electron-main-hmr/HmrClient\").HmrClient; // tslint:disable:no-unused-expression\n\n\nnew HmrClient(socketPath, module.hot, () => {\n  return __webpack_require__.h();\n}); \n// __ts-babel@6.0.4\n//# sourceMappingURL=main-hmr.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZWxlY3Ryb24td2VicGFjay9vdXQvZWxlY3Ryb24tbWFpbi1obXIvbWFpbi1obXIuanM/MWJkYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixtQkFBTyxDQUFDLDBGQUEwQzs7QUFFbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7OztBQUdELGtCQUFrQixtQkFBTyxDQUFDLDBHQUFrRCxZQUFZOzs7QUFHeEY7QUFDQSxTQUFTLHVCQUFnQjtBQUN6QixDQUFDLEU7QUFDRDtBQUNBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL2VsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL21haW4taG1yLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJzb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzXCIpLmluc3RhbGwoKTtcblxuY29uc3Qgc29ja2V0UGF0aCA9IHByb2Nlc3MuZW52LkVMRUNUUk9OX0hNUl9TT0NLRVRfUEFUSDtcblxuaWYgKHNvY2tldFBhdGggPT0gbnVsbCkge1xuICB0aHJvdyBuZXcgRXJyb3IoYFtITVJdIEVudiBFTEVDVFJPTl9ITVJfU09DS0VUX1BBVEggaXMgbm90IHNldGApO1xufSAvLyBtb2R1bGUsIGJ1dCBub3QgcmVsYXRpdmUgcGF0aCBtdXN0IGJlIHVzZWQgKGJlY2F1c2UgdGhpcyBmaWxlIGlzIHVzZWQgYXMgZW50cnkpXG5cblxuY29uc3QgSG1yQ2xpZW50ID0gcmVxdWlyZShcImVsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL0htckNsaWVudFwiKS5IbXJDbGllbnQ7IC8vIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC1leHByZXNzaW9uXG5cblxubmV3IEhtckNsaWVudChzb2NrZXRQYXRoLCBtb2R1bGUuaG90LCAoKSA9PiB7XG4gIHJldHVybiBfX3dlYnBhY2tfaGFzaF9fO1xufSk7IFxuLy8gX190cy1iYWJlbEA2LjAuNFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbi1obXIuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js\n");

/***/ }),

/***/ "./src/main/create-window.js":
/*!***********************************!*\
  !*** ./src/main/create-window.js ***!
  \***********************************/
/*! exports provided: createWindow, closeWindow, recreateWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createWindow\", function() { return createWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"closeWindow\", function() { return closeWindow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"recreateWindow\", function() { return recreateWindow; });\nconst createWindow = (BrowserWindow, mainWindow) => {\n  const dimensions = {\n    width: 1400,\n    height: 940\n  };\n  mainWindow = new BrowserWindow({ ...dimensions,\n    show: false\n  });\n\n  const showWindow = () => mainWindow.show();\n\n  const discardWindow = () => mainWindow = null;\n\n  mainWindow.once('ready-to-show', showWindow); // webpack dev server location\n\n  mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);\n  mainWindow.on('closed', discardWindow);\n};\nconst closeWindow = () => {\n  // On macOS it is common for applications and their menu bar\n  // to stay active until the user quits explicitly with Cmd + Q\n  if (process.platform !== 'darwin') {\n    app.quit();\n  }\n};\nconst recreateWindow = (createWindow, mainWindow) => {\n  // On macOS it's common to re-create a window in the app when the\n  // dock icon is clicked and there are no other windows open.\n  if (mainWindow === null) {\n    createWindow();\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9jcmVhdGUtd2luZG93LmpzP2NjY2IiXSwibmFtZXMiOlsiY3JlYXRlV2luZG93IiwiQnJvd3NlcldpbmRvdyIsIm1haW5XaW5kb3ciLCJkaW1lbnNpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJzaG93Iiwic2hvd1dpbmRvdyIsImRpc2NhcmRXaW5kb3ciLCJvbmNlIiwibG9hZFVSTCIsInByb2Nlc3MiLCJlbnYiLCJFTEVDVFJPTl9XRUJQQUNLX1dEU19QT1JUIiwib24iLCJjbG9zZVdpbmRvdyIsInBsYXRmb3JtIiwiYXBwIiwicXVpdCIsInJlY3JlYXRlV2luZG93Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLE1BQU1BLFlBQVksR0FBRyxDQUFDQyxhQUFELEVBQWdCQyxVQUFoQixLQUErQjtBQUN6RCxRQUFNQyxVQUFVLEdBQUc7QUFBRUMsU0FBSyxFQUFFLElBQVQ7QUFBZUMsVUFBTSxFQUFFO0FBQXZCLEdBQW5CO0FBQ0FILFlBQVUsR0FBRyxJQUFJRCxhQUFKLENBQWtCLEVBQUUsR0FBR0UsVUFBTDtBQUFpQkcsUUFBSSxFQUFFO0FBQXZCLEdBQWxCLENBQWI7O0FBRUEsUUFBTUMsVUFBVSxHQUFHLE1BQU1MLFVBQVUsQ0FBQ0ksSUFBWCxFQUF6Qjs7QUFDQSxRQUFNRSxhQUFhLEdBQUcsTUFBT04sVUFBVSxHQUFHLElBQTFDOztBQUVBQSxZQUFVLENBQUNPLElBQVgsQ0FBZ0IsZUFBaEIsRUFBaUNGLFVBQWpDLEVBUHlELENBU3pEOztBQUNBTCxZQUFVLENBQUNRLE9BQVgsQ0FDRyxvQkFBbUJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyx5QkFBMEIsRUFENUQ7QUFJQVgsWUFBVSxDQUFDWSxFQUFYLENBQWMsUUFBZCxFQUF3Qk4sYUFBeEI7QUFDRCxDQWZNO0FBaUJBLE1BQU1PLFdBQVcsR0FBRyxNQUFNO0FBQy9CO0FBQ0E7QUFDQSxNQUFJSixPQUFPLENBQUNLLFFBQVIsS0FBcUIsUUFBekIsRUFBbUM7QUFDakNDLE9BQUcsQ0FBQ0MsSUFBSjtBQUNEO0FBQ0YsQ0FOTTtBQVFBLE1BQU1DLGNBQWMsR0FBRyxDQUFDbkIsWUFBRCxFQUFlRSxVQUFmLEtBQThCO0FBQzFEO0FBQ0E7QUFDQSxNQUFJQSxVQUFVLEtBQUssSUFBbkIsRUFBeUI7QUFDdkJGLGdCQUFZO0FBQ2I7QUFDRixDQU5NIiwiZmlsZSI6Ii4vc3JjL21haW4vY3JlYXRlLXdpbmRvdy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVXaW5kb3cgPSAoQnJvd3NlcldpbmRvdywgbWFpbldpbmRvdykgPT4ge1xuICBjb25zdCBkaW1lbnNpb25zID0geyB3aWR0aDogMTQwMCwgaGVpZ2h0OiA5NDAgfVxuICBtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coeyAuLi5kaW1lbnNpb25zLCBzaG93OiBmYWxzZSB9KVxuXG4gIGNvbnN0IHNob3dXaW5kb3cgPSAoKSA9PiBtYWluV2luZG93LnNob3coKVxuICBjb25zdCBkaXNjYXJkV2luZG93ID0gKCkgPT4gKG1haW5XaW5kb3cgPSBudWxsKVxuXG4gIG1haW5XaW5kb3cub25jZSgncmVhZHktdG8tc2hvdycsIHNob3dXaW5kb3cpXG5cbiAgLy8gd2VicGFjayBkZXYgc2VydmVyIGxvY2F0aW9uXG4gIG1haW5XaW5kb3cubG9hZFVSTChcbiAgICBgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LkVMRUNUUk9OX1dFQlBBQ0tfV0RTX1BPUlR9YFxuICApXG5cbiAgbWFpbldpbmRvdy5vbignY2xvc2VkJywgZGlzY2FyZFdpbmRvdylcbn1cblxuZXhwb3J0IGNvbnN0IGNsb3NlV2luZG93ID0gKCkgPT4ge1xuICAvLyBPbiBtYWNPUyBpdCBpcyBjb21tb24gZm9yIGFwcGxpY2F0aW9ucyBhbmQgdGhlaXIgbWVudSBiYXJcbiAgLy8gdG8gc3RheSBhY3RpdmUgdW50aWwgdGhlIHVzZXIgcXVpdHMgZXhwbGljaXRseSB3aXRoIENtZCArIFFcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4gICAgYXBwLnF1aXQoKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNyZWF0ZVdpbmRvdyA9IChjcmVhdGVXaW5kb3csIG1haW5XaW5kb3cpID0+IHtcbiAgLy8gT24gbWFjT1MgaXQncyBjb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGVcbiAgLy8gZG9jayBpY29uIGlzIGNsaWNrZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB3aW5kb3dzIG9wZW4uXG4gIGlmIChtYWluV2luZG93ID09PSBudWxsKSB7XG4gICAgY3JlYXRlV2luZG93KClcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/create-window.js\n");

/***/ }),

/***/ "./src/main/extract-csv.js":
/*!*********************************!*\
  !*** ./src/main/extract-csv.js ***!
  \*********************************/
/*! exports provided: extractCsvLines */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extractCsvLines\", function() { return extractCsvLines; });\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst readline = __webpack_require__(/*! readline */ \"readline\");\n\nconst extractCsvLines = filePath => {\n  return new Promise(resolve => {\n    let wantedLines = {};\n    let counter = 0;\n    const readStream = fs.createReadStream(filePath);\n    const lineReader = readline.createInterface({\n      input: readStream\n    }); // On each line, increment counter and add the line to an array.\n\n    lineReader.on('line', function (line) {\n      if (counter === 0) {\n        wantedLines.headers = line.split(',');\n      } else {\n        let row = {};\n        wantedLines.headers.forEach((header, idx) => {\n          row[header] = line.split(',')[idx];\n        });\n\n        if (wantedLines.rows !== undefined) {\n          wantedLines.rows = [...wantedLines.rows, row];\n        } else {\n          wantedLines.rows = [row];\n        }\n      }\n\n      counter++;\n    }); // Upon receiving the close line event, send the\n    // wantedLines to the renderer and close the lineReader.\n\n    lineReader.on('close', function () {\n      // Here we add custom columns to our csv data.\n      wantedLines.headers = ['need', 'want', 'saving', ...wantedLines.headers];\n      wantedLines.rows.forEach(row => {\n        row.need = false;\n        row.want = false;\n        row.saving = false;\n      });\n      resolve(wantedLines);\n      lineReader.close();\n      readStream.destroy();\n    });\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9leHRyYWN0LWNzdi5qcz8wMjMwIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJlYWRsaW5lIiwiZXh0cmFjdENzdkxpbmVzIiwiZmlsZVBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndhbnRlZExpbmVzIiwiY291bnRlciIsInJlYWRTdHJlYW0iLCJjcmVhdGVSZWFkU3RyZWFtIiwibGluZVJlYWRlciIsImNyZWF0ZUludGVyZmFjZSIsImlucHV0Iiwib24iLCJsaW5lIiwiaGVhZGVycyIsInNwbGl0Iiwicm93IiwiZm9yRWFjaCIsImhlYWRlciIsImlkeCIsInJvd3MiLCJ1bmRlZmluZWQiLCJuZWVkIiwid2FudCIsInNhdmluZyIsImNsb3NlIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBLE1BQU1BLEVBQUUsR0FBR0MsbUJBQU8sQ0FBQyxjQUFELENBQWxCOztBQUNBLE1BQU1DLFFBQVEsR0FBR0QsbUJBQU8sQ0FBQywwQkFBRCxDQUF4Qjs7QUFFTyxNQUFNRSxlQUFlLEdBQUdDLFFBQVEsSUFBSTtBQUN6QyxTQUFPLElBQUlDLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCLFFBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsVUFBTUMsVUFBVSxHQUFHVCxFQUFFLENBQUNVLGdCQUFILENBQW9CTixRQUFwQixDQUFuQjtBQUNBLFVBQU1PLFVBQVUsR0FBR1QsUUFBUSxDQUFDVSxlQUFULENBQXlCO0FBQzFDQyxXQUFLLEVBQUVKO0FBRG1DLEtBQXpCLENBQW5CLENBSjRCLENBUTVCOztBQUNBRSxjQUFVLENBQUNHLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFVBQVNDLElBQVQsRUFBZTtBQUNuQyxVQUFJUCxPQUFPLEtBQUssQ0FBaEIsRUFBbUI7QUFDakJELG1CQUFXLENBQUNTLE9BQVosR0FBc0JELElBQUksQ0FBQ0UsS0FBTCxDQUFXLEdBQVgsQ0FBdEI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxHQUFHLEdBQUcsRUFBVjtBQUNBWCxtQkFBVyxDQUFDUyxPQUFaLENBQW9CRyxPQUFwQixDQUE0QixDQUFDQyxNQUFELEVBQVNDLEdBQVQsS0FBaUI7QUFDM0NILGFBQUcsQ0FBQ0UsTUFBRCxDQUFILEdBQWNMLElBQUksQ0FBQ0UsS0FBTCxDQUFXLEdBQVgsRUFBZ0JJLEdBQWhCLENBQWQ7QUFDRCxTQUZEOztBQUdBLFlBQUlkLFdBQVcsQ0FBQ2UsSUFBWixLQUFxQkMsU0FBekIsRUFBb0M7QUFDbENoQixxQkFBVyxDQUFDZSxJQUFaLEdBQW1CLENBQUMsR0FBR2YsV0FBVyxDQUFDZSxJQUFoQixFQUFzQkosR0FBdEIsQ0FBbkI7QUFDRCxTQUZELE1BRU87QUFDTFgscUJBQVcsQ0FBQ2UsSUFBWixHQUFtQixDQUFDSixHQUFELENBQW5CO0FBQ0Q7QUFDRjs7QUFDRFYsYUFBTztBQUNSLEtBZkQsRUFUNEIsQ0EwQjVCO0FBQ0E7O0FBQ0FHLGNBQVUsQ0FBQ0csRUFBWCxDQUFjLE9BQWQsRUFBdUIsWUFBVztBQUNoQztBQUNBUCxpQkFBVyxDQUFDUyxPQUFaLEdBQXNCLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkIsR0FBR1QsV0FBVyxDQUFDUyxPQUExQyxDQUF0QjtBQUNBVCxpQkFBVyxDQUFDZSxJQUFaLENBQWlCSCxPQUFqQixDQUF5QkQsR0FBRyxJQUFJO0FBQzlCQSxXQUFHLENBQUNNLElBQUosR0FBVyxLQUFYO0FBQ0FOLFdBQUcsQ0FBQ08sSUFBSixHQUFXLEtBQVg7QUFDQVAsV0FBRyxDQUFDUSxNQUFKLEdBQWEsS0FBYjtBQUNELE9BSkQ7QUFNQXBCLGFBQU8sQ0FBQ0MsV0FBRCxDQUFQO0FBQ0FJLGdCQUFVLENBQUNnQixLQUFYO0FBQ0FsQixnQkFBVSxDQUFDbUIsT0FBWDtBQUNELEtBWkQ7QUFhRCxHQXpDTSxDQUFQO0FBMENELENBM0NNIiwiZmlsZSI6Ii4vc3JjL21haW4vZXh0cmFjdC1jc3YuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IHJlYWRsaW5lID0gcmVxdWlyZSgncmVhZGxpbmUnKVxuXG5leHBvcnQgY29uc3QgZXh0cmFjdENzdkxpbmVzID0gZmlsZVBhdGggPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHdhbnRlZExpbmVzID0ge31cbiAgICBsZXQgY291bnRlciA9IDBcbiAgICBjb25zdCByZWFkU3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlUGF0aClcbiAgICBjb25zdCBsaW5lUmVhZGVyID0gcmVhZGxpbmUuY3JlYXRlSW50ZXJmYWNlKHtcbiAgICAgIGlucHV0OiByZWFkU3RyZWFtLFxuICAgIH0pXG5cbiAgICAvLyBPbiBlYWNoIGxpbmUsIGluY3JlbWVudCBjb3VudGVyIGFuZCBhZGQgdGhlIGxpbmUgdG8gYW4gYXJyYXkuXG4gICAgbGluZVJlYWRlci5vbignbGluZScsIGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIGlmIChjb3VudGVyID09PSAwKSB7XG4gICAgICAgIHdhbnRlZExpbmVzLmhlYWRlcnMgPSBsaW5lLnNwbGl0KCcsJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByb3cgPSB7fVxuICAgICAgICB3YW50ZWRMaW5lcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgcm93W2hlYWRlcl0gPSBsaW5lLnNwbGl0KCcsJylbaWR4XVxuICAgICAgICB9KVxuICAgICAgICBpZiAod2FudGVkTGluZXMucm93cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2FudGVkTGluZXMucm93cyA9IFsuLi53YW50ZWRMaW5lcy5yb3dzLCByb3ddXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FudGVkTGluZXMucm93cyA9IFtyb3ddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvdW50ZXIrK1xuICAgIH0pXG5cbiAgICAvLyBVcG9uIHJlY2VpdmluZyB0aGUgY2xvc2UgbGluZSBldmVudCwgc2VuZCB0aGVcbiAgICAvLyB3YW50ZWRMaW5lcyB0byB0aGUgcmVuZGVyZXIgYW5kIGNsb3NlIHRoZSBsaW5lUmVhZGVyLlxuICAgIGxpbmVSZWFkZXIub24oJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBIZXJlIHdlIGFkZCBjdXN0b20gY29sdW1ucyB0byBvdXIgY3N2IGRhdGEuXG4gICAgICB3YW50ZWRMaW5lcy5oZWFkZXJzID0gWyduZWVkJywgJ3dhbnQnLCAnc2F2aW5nJywgLi4ud2FudGVkTGluZXMuaGVhZGVyc11cbiAgICAgIHdhbnRlZExpbmVzLnJvd3MuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICByb3cubmVlZCA9IGZhbHNlXG4gICAgICAgIHJvdy53YW50ID0gZmFsc2VcbiAgICAgICAgcm93LnNhdmluZyA9IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICByZXNvbHZlKHdhbnRlZExpbmVzKVxuICAgICAgbGluZVJlYWRlci5jbG9zZSgpXG4gICAgICByZWFkU3RyZWFtLmRlc3Ryb3koKVxuICAgIH0pXG4gIH0pXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/extract-csv.js\n");

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _extract_csv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extract-csv */ \"./src/main/extract-csv.js\");\n/* harmony import */ var _create_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-window */ \"./src/main/create-window.js\");\n// Modules to control application life and create native browser window\n\n\n\n // Keep a global reference of the window object, if you don't, the window will\n// be closed automatically when the JavaScript object is garbage collected.\n\nlet mainWindow; // This method will be called when Electron has finished\n// initialization and is ready to create browser windows.\n// Some APIs can only be used after this event occurs.\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', () => Object(_create_window__WEBPACK_IMPORTED_MODULE_3__[\"createWindow\"])(electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"], mainWindow)); // Quit when all windows are closed.\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', _create_window__WEBPACK_IMPORTED_MODULE_3__[\"closeWindow\"]);\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', () => Object(_create_window__WEBPACK_IMPORTED_MODULE_3__[\"recreateWindow\"])(_create_window__WEBPACK_IMPORTED_MODULE_3__[\"createWindow\"], mainWindow));\n\nasync function sendCsvExtracted(event, filePath) {\n  const headers = await Object(_extract_csv__WEBPACK_IMPORTED_MODULE_2__[\"extractCsvLines\"])(filePath);\n  event.sender.send('extract-csv-data-reply', {\n    data: headers\n  });\n}\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('extract-csv-data', (event, filePaths) => {\n  filePaths.forEach(function (filePath) {\n    const isCSV = path__WEBPACK_IMPORTED_MODULE_1___default.a.extname(filePath).toLowerCase() === '.csv';\n\n    if (isCSV) {\n      try {\n        sendCsvExtracted(event, filePath);\n      } catch (error) {\n        console.log('An error has occurred  when attempting to send the extracted csv data.'); // TODO: Test that this works.\n      }\n    } else {\n      event.sender.send('extract-csv-data-reply', {\n        error: true,\n        data: 'Not a .csv file'\n      });\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9pbmRleC5qcz9lNTlhIl0sIm5hbWVzIjpbIm1haW5XaW5kb3ciLCJhcHAiLCJvbiIsImNyZWF0ZVdpbmRvdyIsIkJyb3dzZXJXaW5kb3ciLCJjbG9zZVdpbmRvdyIsInJlY3JlYXRlV2luZG93Iiwic2VuZENzdkV4dHJhY3RlZCIsImV2ZW50IiwiZmlsZVBhdGgiLCJoZWFkZXJzIiwiZXh0cmFjdENzdkxpbmVzIiwic2VuZGVyIiwic2VuZCIsImRhdGEiLCJpcGNNYWluIiwiZmlsZVBhdGhzIiwiZm9yRWFjaCIsImlzQ1NWIiwicGF0aCIsImV4dG5hbWUiLCJ0b0xvd2VyQ2FzZSIsImVycm9yIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtDQUdBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBSixDLENBRUE7QUFDQTtBQUNBOztBQUNBQyw0Q0FBRyxDQUFDQyxFQUFKLENBQU8sT0FBUCxFQUFnQixNQUFNQyxtRUFBWSxDQUFDQyxzREFBRCxFQUFnQkosVUFBaEIsQ0FBbEMsRSxDQUVBOztBQUNBQyw0Q0FBRyxDQUFDQyxFQUFKLENBQU8sbUJBQVAsRUFBNEJHLDBEQUE1QjtBQUNBSiw0Q0FBRyxDQUFDQyxFQUFKLENBQU8sVUFBUCxFQUFtQixNQUFNSSxxRUFBYyxDQUFDSCwyREFBRCxFQUFlSCxVQUFmLENBQXZDOztBQUVBLGVBQWVPLGdCQUFmLENBQWdDQyxLQUFoQyxFQUF1Q0MsUUFBdkMsRUFBaUQ7QUFDL0MsUUFBTUMsT0FBTyxHQUFHLE1BQU1DLG9FQUFlLENBQUNGLFFBQUQsQ0FBckM7QUFDQUQsT0FBSyxDQUFDSSxNQUFOLENBQWFDLElBQWIsQ0FBa0Isd0JBQWxCLEVBQTRDO0FBQUVDLFFBQUksRUFBRUo7QUFBUixHQUE1QztBQUNEOztBQUVESyxnREFBTyxDQUFDYixFQUFSLENBQVcsa0JBQVgsRUFBK0IsQ0FBQ00sS0FBRCxFQUFRUSxTQUFSLEtBQXNCO0FBQ25EQSxXQUFTLENBQUNDLE9BQVYsQ0FBa0IsVUFBU1IsUUFBVCxFQUFtQjtBQUNuQyxVQUFNUyxLQUFLLEdBQUdDLDJDQUFJLENBQUNDLE9BQUwsQ0FBYVgsUUFBYixFQUF1QlksV0FBdkIsT0FBeUMsTUFBdkQ7O0FBQ0EsUUFBSUgsS0FBSixFQUFXO0FBQ1QsVUFBSTtBQUNGWCx3QkFBZ0IsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLENBQWhCO0FBQ0QsT0FGRCxDQUVFLE9BQU9hLEtBQVAsRUFBYztBQUNkQyxlQUFPLENBQUNDLEdBQVIsQ0FDRSx3RUFERixFQURjLENBR1o7QUFDSDtBQUNGLEtBUkQsTUFRTztBQUNMaEIsV0FBSyxDQUFDSSxNQUFOLENBQWFDLElBQWIsQ0FBa0Isd0JBQWxCLEVBQTRDO0FBQzFDUyxhQUFLLEVBQUUsSUFEbUM7QUFFMUNSLFlBQUksRUFBRTtBQUZvQyxPQUE1QztBQUlEO0FBQ0YsR0FoQkQ7QUFpQkQsQ0FsQkQiLCJmaWxlIjoiLi9zcmMvbWFpbi9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZXMgdG8gY29udHJvbCBhcHBsaWNhdGlvbiBsaWZlIGFuZCBjcmVhdGUgbmF0aXZlIGJyb3dzZXIgd2luZG93XG5pbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4gfSBmcm9tICdlbGVjdHJvbidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBleHRyYWN0Q3N2TGluZXMgfSBmcm9tICcuL2V4dHJhY3QtY3N2J1xuaW1wb3J0IHsgY3JlYXRlV2luZG93LCBjbG9zZVdpbmRvdywgcmVjcmVhdGVXaW5kb3cgfSBmcm9tICcuL2NyZWF0ZS13aW5kb3cnXG5cbi8vIEtlZXAgYSBnbG9iYWwgcmVmZXJlbmNlIG9mIHRoZSB3aW5kb3cgb2JqZWN0LCBpZiB5b3UgZG9uJ3QsIHRoZSB3aW5kb3cgd2lsbFxuLy8gYmUgY2xvc2VkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgSmF2YVNjcmlwdCBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQuXG5sZXQgbWFpbldpbmRvd1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCB3aGVuIEVsZWN0cm9uIGhhcyBmaW5pc2hlZFxuLy8gaW5pdGlhbGl6YXRpb24gYW5kIGlzIHJlYWR5IHRvIGNyZWF0ZSBicm93c2VyIHdpbmRvd3MuXG4vLyBTb21lIEFQSXMgY2FuIG9ubHkgYmUgdXNlZCBhZnRlciB0aGlzIGV2ZW50IG9jY3Vycy5cbmFwcC5vbigncmVhZHknLCAoKSA9PiBjcmVhdGVXaW5kb3coQnJvd3NlcldpbmRvdywgbWFpbldpbmRvdykpXG5cbi8vIFF1aXQgd2hlbiBhbGwgd2luZG93cyBhcmUgY2xvc2VkLlxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsIGNsb3NlV2luZG93KVxuYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHJlY3JlYXRlV2luZG93KGNyZWF0ZVdpbmRvdywgbWFpbldpbmRvdykpXG5cbmFzeW5jIGZ1bmN0aW9uIHNlbmRDc3ZFeHRyYWN0ZWQoZXZlbnQsIGZpbGVQYXRoKSB7XG4gIGNvbnN0IGhlYWRlcnMgPSBhd2FpdCBleHRyYWN0Q3N2TGluZXMoZmlsZVBhdGgpXG4gIGV2ZW50LnNlbmRlci5zZW5kKCdleHRyYWN0LWNzdi1kYXRhLXJlcGx5JywgeyBkYXRhOiBoZWFkZXJzIH0pXG59XG5cbmlwY01haW4ub24oJ2V4dHJhY3QtY3N2LWRhdGEnLCAoZXZlbnQsIGZpbGVQYXRocykgPT4ge1xuICBmaWxlUGF0aHMuZm9yRWFjaChmdW5jdGlvbihmaWxlUGF0aCkge1xuICAgIGNvbnN0IGlzQ1NWID0gcGF0aC5leHRuYW1lKGZpbGVQYXRoKS50b0xvd2VyQ2FzZSgpID09PSAnLmNzdidcbiAgICBpZiAoaXNDU1YpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlbmRDc3ZFeHRyYWN0ZWQoZXZlbnQsIGZpbGVQYXRoKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ0FuIGVycm9yIGhhcyBvY2N1cnJlZCAgd2hlbiBhdHRlbXB0aW5nIHRvIHNlbmQgdGhlIGV4dHJhY3RlZCBjc3YgZGF0YS4nXG4gICAgICAgICkgLy8gVE9ETzogVGVzdCB0aGF0IHRoaXMgd29ya3MuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKCdleHRyYWN0LWNzdi1kYXRhLXJlcGx5Jywge1xuICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgZGF0YTogJ05vdCBhIC5jc3YgZmlsZScsXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/index.js\n");

/***/ }),

/***/ 0:
/*!****************************************************************************************************************************************************************************!*\
  !*** multi ./node_modules/electron-webpack/out/electron-main-hmr/main-hmr ./node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js ./src/main/index.js ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/katiaalamir/Projects/budget-app/node_modules/electron-webpack/out/electron-main-hmr/main-hmr */"./node_modules/electron-webpack/out/electron-main-hmr/main-hmr.js");
__webpack_require__(/*! /Users/katiaalamir/Projects/budget-app/node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js */"./node_modules/electron-webpack/out/configurators/vue/vue-main-dev-entry.js");
module.exports = __webpack_require__(/*! /Users/katiaalamir/Projects/budget-app/src/main/index.js */"./src/main/index.js");


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiPzA0ZjMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron\n");

/***/ }),

/***/ "electron-devtools-installer":
/*!**********************************************!*\
  !*** external "electron-devtools-installer" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-devtools-installer\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi1kZXZ0b29scy1pbnN0YWxsZXJcIj9jZThjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImVsZWN0cm9uLWRldnRvb2xzLWluc3RhbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLWRldnRvb2xzLWluc3RhbGxlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron-devtools-installer\n");

/***/ }),

/***/ "electron-webpack/out/electron-main-hmr/HmrClient":
/*!*******************************************************************!*\
  !*** external "electron-webpack/out/electron-main-hmr/HmrClient" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron-webpack/out/electron-main-hmr/HmrClient\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvbi13ZWJwYWNrL291dC9lbGVjdHJvbi1tYWluLWhtci9IbXJDbGllbnRcIj9kZTY3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImVsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL0htckNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uLXdlYnBhY2svb3V0L2VsZWN0cm9uLW1haW4taG1yL0htckNsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///electron-webpack/out/electron-main-hmr/HmrClient\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiP2E0MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///fs\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFkbGluZVwiPzk5YjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhZGxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///readline\n");

/***/ }),

/***/ "source-map-support/source-map-support.js":
/*!***********************************************************!*\
  !*** external "source-map-support/source-map-support.js" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"source-map-support/source-map-support.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzXCI/OWM1ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJzb3VyY2UtbWFwLXN1cHBvcnQvc291cmNlLW1hcC1zdXBwb3J0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0L3NvdXJjZS1tYXAtc3VwcG9ydC5qc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///source-map-support/source-map-support.js\n");

/***/ })

/******/ });