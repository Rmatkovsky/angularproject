app.factory('userModel', ['defaultModel', function( defaultModel ) {

    "use strict";
    var userModel = defaultModel.$new();

    userModel.url = {
        create:  "/api/seance",
        show:    "/api/seance",
        destroy: "/api/seance"
    };

    /**
     * to set validation ruls for your model
     * it's example
     * @type {{name: {presence: {message: string}, minLength: {value: number, message: string}, maxLength: {value: number, message: string}, pattern: {value: string, message: string}}, password: {presence: {message: string}, minLength: {value: number, message: string}, maxLength: {value: number, message: string}, pattern: {value: string, message: string}}}}
     */
    userModel.validationRules = {
        name: {
            presence:  {
                message:  "The name must not be empty"
            },
            minLength: {
                value:    2,
                message:  "The name must not be less than 2 symbols"
            },
            maxLength: {
                value:    20,
                message:  "The name must not be more than 20 symbols"
            },
            pattern: {
                value: "^[A-Za-z0-9]*$",
                message: "The name incorrect(only english letters and digits)"
            }
        },
        password: {
            presence:  {
                message:  "The password must not be empty"
            },
            minLength: {
                value:    2,
                message:  "The password must not be less than 2 symbols"
            },
            maxLength: {
                value:    20,
                message:  "The password must not be more than 20 symbols"
            },
            pattern: {
                value: "^[0-9]+$",
                message: "The password incorrect(only digits)"
            }
        }
    };

    userModel.userRoleIDs = {
        'admin':        "1",
        'user':         "2"
    };

    /**
     * [logOut - logout]
     */
    userModel.logOut = function () {
        delete userModel.model;
    };

    /**
     * [isAuthenticated - check authentification]
     * @return {Boolean} [if user registered]
     */
    userModel.isAuthenticated = function () {
        return !!userModel.model;
    };

    /**
     * [getUserRoleID get user Role id]
     * @return {int} [role id]
     */
    userModel.getUserRoleID = function () {
        if ( !this.isAuthenticated() ) {
            return 0;
        };
        return userModel.model.roleId;
    };

    /**
     * [getRoleIdByName get role id from role name for checking permissions]
     * @param  {string} roleName
     * @return {string}          [role id]
     */
    userModel.getRoleIdByName = function ( roleName ) {
        var roleId, roleKey;

        for ( roleKey in this.userRoleIDs ) {
            if ( hasOwnProperty.call( this.userRoleIDs,  roleKey ) ) {
                if ( roleKey.toString().toLowerCase() === roleName.toString().toLowerCase() ) {
                    roleId = this.userRoleIDs[roleKey];
                };
            };
        };

        return roleId;
    };

    return userModel;
}]);
