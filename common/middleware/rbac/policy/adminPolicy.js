
const { GET_ALL_NOTES, GET_NOTE, ADD_NEW_NOTE, DELETE_NOTE, GET_NOTE_BY_TYPE } = require("../../../../modules/notes/endPoints");
const {
    GET_ALL_USERS,
    GET_USER,
    SIGNUP,
    UPDATE_USER,
    DELETE_USER,
    SIGNIN,
    REMOVERECEIVED,
} = require("../../../../modules/users/endPoints");

module.exports = {
    can: [
        GET_ALL_USERS,
        GET_USER,
        SIGNUP,
        SIGNIN,
        UPDATE_USER,
        DELETE_USER,
        REMOVERECEIVED,

        GET_ALL_NOTES,
        GET_NOTE,
        GET_NOTE_BY_TYPE,
        ADD_NEW_NOTE,
        DELETE_NOTE,

    ],
};
