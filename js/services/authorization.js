app.factory('authorization', ['userModel', '$q', function( userModel, $q ) {
    var authorization = {};

    /**
     * [cleanAuthData - clean headers and so on for auth]
     */
    authorization.cleanAuthData = function () {
        userModel.logOut();
    };

    /**
     * [logout - logout functionality. with header and cookie deleting. also we destroy session on server]
     * @returns {*}
     */
    authorization.logout = function () {
        if ( !userModel.model ) {
            return false;
        };
        var promise = userModel.destroyModel()
            .then(
            function () {
                authorization.cleanAuthData();
            }
        );
        return promise;
    };

    /**
     * [fillInSeance - fillIn  session]
     * @param {object} user [user session]
     */
    authorization.fillInSeance = function ( session ) {
        userModel.model = session;
    };

    /**
     * [login - login functionality. with header creating. also we create session on server]
     * @param scope
     * @param login
     * @param password
     * @returns {*}
     */
    authorization.login = function ( scope, login, password ) {
        var defered = $q.defer(),
            promise, resultPromise;

        resultPromise = userModel.createNew( scope, { login: login, password: password });

        if ( resultPromise ) {
            promise = resultPromise;
        } else {
            defered.reject("validation error");
            promise = defered.promise;
        };

        promise
            .then(
            function ( itemUser ) {
                authorization.fillInSeance( itemUser.item );
            }
        );
        return promise;
    };

    /**
     * [relogin - re login functionality]
     * @param scope
     * @returns {*}
     */
    authorization.relogin = function ( scope ) {
        var promise = userModel.getModel( scope || {} )
            .then(
            function ( data ) {
                userModel.model = data.item;
                userModel.isAuthentificationChecked = true;
            },
            authorization.cleanAuthData.bind( authorization )
        );
        return promise;
    };

    return authorization;
}]);
