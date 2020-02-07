export default function reducer(state = {}, action) {
    return state;

    // the reducer is just going to be a lot of if statements
    //
    //     if (action.tpe === "ALL_CAPS_WITH_UNDERSCORES") {
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
}
