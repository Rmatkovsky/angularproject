/**
 * this service includes functions which work as helper
 * this service you can injection in your controller or model and use it
 */

app.factory('globalFunctions', [function( ) {
    var globalFunctions = {};

    /**
     * errors - this global variable for all errors
     * @type {{}}
     */
    globalFunctions.errors = {};

    /**
     * getErrors - check if is exists errors by value
     * @param iValueName
     * @returns {*}
     */
    globalFunctions.getErrors = function( iValueName ) {
        var valueName = iValueName.toLowerCase();

        return this.errors[ valueName ];
    };

    /**
     * clearErrors - to clean errors variable
     */
    globalFunctions.clearErrors = function() {
        this.errors = {};
    };

    /**
     * isEmpty - this function(helper) for check if is empty value(numeric,string,object,array and etc.)
     * @param iValue
     * @returns {boolean}
     */
    globalFunctions.isEmpty = function ( iValue ) {
        if ( iValue == null ) {
                return true;
        };
        if ( iValue.length > 0 ) {
            return false;
        };
        if ( iValue.length === 0 )  {
            return true;
        };

        for ( var key in iValue ) {
            if ( hasOwnProperty.call( iValue, key ) ) {
                return false;
            };
        };

        return true;
    };

    return globalFunctions;
}]);
