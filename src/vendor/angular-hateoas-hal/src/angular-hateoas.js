/**
 * @module hateoas
 *
 * An AngularJS module for working with HATEOAS.
 *
 * Setup
 * =====
 *
 * ```javascript
 * angular.module("your-application", ["hateoas"]);
 * ```
 *
 * Using HateoasInterface
 * ======================
 *
 * The `HateoasInterface` service is a class that can be instantiated to consume a raw HATEOAS response. It searches the response for a `links` property and provides a `resource` method to interact with the links.
 *
 * Assume a resource result `someResult` looks like this:
 *
 * ```json
 * {
 *     "arbitraryStringField": "some value",
 *     "arbitraryNumberField": 31,
 *     "links": [
 *         {
 *             "rel": "something-related",
 *             "href": "/arbitrary/link"
 *         },
 *         {
 *             "rel": "something-else-related",
 *             "href": "/another/arbitrary/link"
 *         }
 *     ]
 * }
 * ```
 *
 * The workflow for implementing `HateoasInterface` might look something like this:
 *
 * ```javascript
 * var someResource = $resource("/some/rest/endpoint");
 * var someResult = someResource.get(null, function () {
 *     var object = new HateoasInterface(someResult);
 *     var putResult = object.resource("something-related").put({ someData: "whatever" }, function () {
 *         // logic, etc.
 *     });
 * });
 * ```
 *
 * Using HateoasInterceptor
 * ========================
 *
 * The `HateoasInterceptor` service is a way of making your application globally HATEOAS-enabled. It adds a global HTTP response interceptor that transforms HATEOAS responses into HateoasInterface instances.
 *
 * First, initialize the interceptor:
 *
 * ```javascript
 * app.config(function (HateoasInterceptorProvider) {
 *     HateoasInterceptorProvider.transformAllResponses();
 * });
 * ```
 *
 * Then any HATEOAS response will automatically have the `resource` method:
 *
 * ```javascript
 * var someResource = $resource("/some/rest/endpoint");
 * var someResult = someResource.get(null, function () {
 *     var putResult = someResult.resource("something-related").put({ someData: "whatever" }, function () {
 *         // logic, etc.
 *     });
 * })
 * ```
 */
angular.module("hateoas", ["ngResource"])

	.provider("HateoasInterface", function () {

		// global Hateoas settings
		var globalHttpMethods,
			linksKey = "links",
            halLinkKey = "_links";


		return {

			setLinksKey: function (newLinksKey) {
				linksKey = newLinksKey || linksKey;
			},

			getLinksKey: function () {
				return linksKey;
			},

			setHttpMethods: function (httpMethods) {
				globalHttpMethods = angular.copy(httpMethods);
			},

			$get: ["$injector", function ($injector) {

				var arrayToObject = function (keyItem, valueItem, array) {
					var obj = {};
					angular.forEach(array, function (item, index) {
						if (item[keyItem] && item[valueItem]) {
							obj[item[keyItem]] = item[valueItem];
						}
					});
					return obj;
				};

                var objectConverter = function(object) {
                    var obj = {};
                    angular.forEach(object, function (item, key) {
                        obj[key] = item["href"];
                    })
                    return obj
                };

				var HateoasInterface = function (data) {

					// if links are present, consume object and convert links
					if (data[linksKey] || data[halLinkKey]) {
                        if (angular.isObject(data[halLinkKey])) {
                            data = angular.extend(this, data, { links: objectConverter(data[halLinkKey]) });
                        } else {
                            data = angular.extend(this, data, { links: arrayToObject("rel", "href", data[linksKey]) });
                        }
					}

					// recursively consume all contained arrays or objects with links
					angular.forEach(data, function (value, key) {
//						if (key !== linksKey && angular.isObject(value) && (angular.isArray(value) || value[linksKey])) {
                        if( key == "_embedded") { // HAL fomat detected
                            angular.forEach(value, function(embedded, key) {
                                        if (angular.isArray(embedded)) {
                                            angular.forEach(embedded, function(item, index) {
                                                    embedded[index] = new HateoasInterface(item);
                                                });
                                        }
                                    });
                        }
                        else {
                            if (key !== linksKey && angular.isObject(value)) {
                                data[key] = new HateoasInterface(value);
                            }
                        }
					});

					return data;
				};

				HateoasInterface.prototype.resource = function (linkName, bindings, httpMethods) {
					if (linkName in this["links"]) {
						return $injector.get("$resource")(this["links"][linkName], bindings, httpMethods || globalHttpMethods);
					} else {
						throw "Link '" + linkName + "' is not present in object.";
					}
				};

				return HateoasInterface;

			}]

		};

	})

	.provider("HateoasInterceptor", ["$httpProvider", "HateoasInterfaceProvider", function ($httpProvider, HateoasInterfaceProvider) {
		
		var linksKey = HateoasInterfaceProvider.getLinksKey();

		return {

			transformAllResponses: function () {
				$httpProvider.interceptors.push("HateoasInterceptor");
			},

			$get: ["HateoasInterface", "$q", function (HateoasInterface, $q) {

				return {
					response: function (response) {

						if (response && angular.isObject(response.data)) {
							response.data = new HateoasInterface(response.data);
						}

						return response || $q.when(response);

					}
				};
			}]

		};

	}]);
