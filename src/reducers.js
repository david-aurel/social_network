export default function reducer(state = {}, action) {
    // the reducer is just going to be a lot of if statements
    //
    //     if (action.type === "ALL_CAPS_WITH_UNDERSCORES") {
    //         and immutably change state (copy and modify. dont mutate! no push, pop, etc.
    //         state = {
    //             ...state,
    //             newProperty: 'newKey'
    //         }
    //     }
    //
    // map - good for changing item(s) in an array
    // filter - good for filtering out an item from an array
    // concat - good for adding arrays together
    // ... spread operator - good for making copies of arrays and objects
    // Object.assign - also good for making copies of objects

    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(user => {
                if (user.id == action.id) {
                    user.accepted = true;
                }
                return user;
            })
        };
    }

    if (action.type === "UNFRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                user => user.id != action.id
            )
        };
    }

    if (action.type === "HOTORNOT") {
        state = {
            ...state,
            hotornot: action.user
        };
    }

    if (action.type === "CHAT_MESSAGES") {
        state = {
            ...state,
            msgs: action.msgs
        };
    }

    if (action.type === "CHAT_MESSAGE") {
        state = {
            ...state,
            msgs: [...state.msgs, action.msg]
        };
    }

    return state;
}
