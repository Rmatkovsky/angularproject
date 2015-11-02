app.factory('defaultModel', ['$rootScope', '$resource', 'globalFunctions',  function( $rootScope, $resource, globalFunctions) {
    "use strict";

    var defaultModel = $rootScope.$new(),
        sendNewModelOnREsource, parametersSubstitution, isValidModel, destroyModelOnResource, fetchModelFromResource;

    defaultModel.validationRules = {};

    // mockups for children
    defaultModel.url = {
        create: "",
        show: "",
        destroy: ""
    };

    // substitute params to url
    parametersSubstitution = function ( url, params ) {
        var fullUrl = url,
            paramKey;

        if ( !params ) {
            return fullUrl;
        };

        for ( paramKey in params ) {
            if ( hasOwnProperty.call( params,  paramKey ) ) {
                fullUrl = fullUrl.replace( ":" + paramKey, params[paramKey] );
            };
        };
        return fullUrl;
    };

    /**
     * [fetchModelFromResource - fetch one model from server]
     * @param scope
     * @param params
     * @returns {$promise|*}
     */
    fetchModelFromResource = function ( scope, params ) {
        var sParams = parametersSubstitution( this.url.show, params ),
            modelGet = $resource( sParams, {}, { get: {method: 'GET'}}),
            promise = modelGet.get().$promise;

        return promise;
    };

    /**
     * [destroyModelOnResource - destroy model on server]
     * @param scope
     * @param params
     * @returns {$promise|*}
     */
    destroyModelOnResource = function ( scope, params ) {
        var sParams = parametersSubstitution( this.url.destroy, params ),
            modelDestroy = $resource( sParams, {}, {destroy: {method: 'DELETE'}} ),
            promise = modelDestroy.destroy().$promise;

        return promise;
    };

    /**
     * isValidModel - this function check all ruls when you put on the validationRuls variable
     * the validationRules variable is indicated in each model which you create
     * @param scope
     * @param newModel
     * @param exeptFieldArray
     */
    isValidModel = function ( scope, newModel, exeptFieldArray ) {
        var checkPresents, checkMinLength, checkMaxLength, checkPatternMatch,
            newModelKey, isExistFieldInExeptFieldArray;

        checkPresents = function ( objectKey, objectValue ) {

            var currentValidation = this.validationRules[objectKey];
            
            if ( currentValidation && currentValidation.presence ) {
                if ( objectValue && objectValue.toString().trim().length !== 0 ) {
                    return false;
                };

                scope.errors[objectKey.toLowerCase()] = currentValidation.presence.message;
            };
        };

        checkMinLength = function ( objectKey, objectValue ) {
            var currentValidation = this.validationRules[objectKey];
            if ( currentValidation && currentValidation.minLength ) {
                if ( objectValue
                    && objectValue.toString().trim().length < currentValidation.minLength.value ) {
                        scope.errors[objectKey.toLowerCase()] = currentValidation.minLength.message;
                };
            };
        };

        checkMaxLength = function ( objectKey, objectValue ) {
            var currentValidation = this.validationRules[objectKey];
            if ( currentValidation && currentValidation.maxLength ) {
                if ( objectValue
                    && objectValue.toString().trim().length > currentValidation.maxLength.value ) {
                        scope.errors[objectKey.toLowerCase()] = currentValidation.maxLength.message;
                };
            };
        };

        checkPatternMatch = function (  objectKey, objectValue ) {
            var currentValidation = this.validationRules[objectKey];
            if ( currentValidation
                && currentValidation.pattern && currentValidation.pattern.value ) {
                    var patterRegObject = new RegExp( currentValidation.pattern.value );
                    if ( objectValue && !patterRegObject.test( objectValue.toString() ) ) {
                        scope.errors[objectKey.toLowerCase()] = currentValidation.pattern.message;
                    };
            };
        };

        isExistFieldInExeptFieldArray = function ( fieldName ) {
            var result  = false;

            if ( !exeptFieldArray || ( exeptFieldArray && !exeptFieldArray.length )) {
                result = false;
                return result;
            };

            exeptFieldArray.some(
                function ( field ) {
                    if ( fieldName == field ) {
                        result = true;
                        return result;
                    };
                }
            );

            return result;
        };

        for( newModelKey in newModel ) {
            if ( hasOwnProperty.call( newModel,  newModelKey )
                && !isExistFieldInExeptFieldArray(newModelKey) ) {
                    checkPresents.call( this, newModelKey, newModel[newModelKey] );
                    checkMinLength.call( this, newModelKey, newModel[newModelKey] );
                    checkMaxLength.call( this, newModelKey, newModel[newModelKey] );
                    checkPatternMatch.call( this, newModelKey, newModel[newModelKey] );
            };
        };

        return globalFunctions.isEmpty( scope.errors );
    };

    /**
     * validate - this function call the isValidModel function
     * @param scope
     * @param newModel
     * @param exeptFieldArray
     * @returns {*}
     */
    defaultModel.validate = function ( scope, newModel, exeptFieldArray ) {
        return isValidModel.call( this, scope, newModel, exeptFieldArray );
    };

    /**
     * [sendNewModelOnREsource - create new model on server]
     * @param scope
     * @param newModel
     * @param params
     * @param exeptFieldArray
     * @returns {*}
     */
    sendNewModelOnREsource = function ( scope, newModel, params, exeptFieldArray ) {
        if ( !isValidModel.call( this, scope, newModel, exeptFieldArray ) ) {
            return false;
        };

        var sParams = parametersSubstitution( this.url.create, params ),
            modelCreate = $resource( sParams, {}, {create: {method: 'POST'}} ),
            promise = modelCreate.create( newModel ).$promise;

        return promise;
    };

    /**
     * [createNew - wrapper for create new]
     * @param scope
     * @param newModel
     * @param params
     * @returns {*}
     */
    defaultModel.createNew = function ( scope, newModel, params, exeptFieldArray ) {
        return sendNewModelOnREsource.call( this, scope, newModel, params, exeptFieldArray );
    };

    /**
     * [getModel - wrapper for getModel]
     * @param scope
     * @param params
     * @returns {$promise|*}
     */
    defaultModel.getModel = function ( scope, params ) {
        return fetchModelFromResource.call( this, scope, params );
    };

    /**
     * [destroyModel - wrapper for destroy]
     * @param scope
     * @param params
     * @returns {$promise|*}
     */
    defaultModel.destroyModel = function ( scope, params ) {
        return destroyModelOnResource.call( this, scope, params );
    };

return defaultModel;
    
}]);
