const {
    GET_ALL_USERS,
    GET_USER,
    SIGNUP,
    UPDATE_USER,
    DELETE_USER,
    SIGNIN,
    REMOVERECEIVED
} = require("../../../../modules/users/endPoints");

module.exports = {
    can: [
        GET_ALL_USERS,
        GET_USER,
        SIGNUP,
        SIGNIN,
        UPDATE_USER,
        DELETE_USER,
        REMOVERECEIVED
    ],
};
