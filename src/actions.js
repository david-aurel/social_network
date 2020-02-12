import axios from "./axios";
import reducer from "./reducers";

// export function fn() {
// makes axios requests to server
// all action creators will return objects that have a type property
// {
//     type: 'UPDATE_BIO',
//     bio: 'New Bio etc'
// }
// all types should be written with ALL_CAPS_AND_UNDERSCORES
// }

export async function receiveFriendsAndWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/${id}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: id
    };
}

export async function endFriendship(id) {
    await axios.post(`/end-friendship/${id}`);
    return {
        type: "UNFRIEND",
        id: id
    };
}

export async function receiveHotOrNotUser() {
    const { data } = await axios.get("/hotornot.json");
    return {
        type: "HOTORNOT",
        user: data
    };
}

export async function sendFriendRequest(id) {
    const { data } = await axios.post(`/make-friend-request/${id}`);
    return {
        type: "HOTORNOT",
        user: data
    };
}

export async function chatMessages(msgs) {
    return {
        type: "CHAT_MESSAGES",
        msgs: msgs
    };
}

export async function chatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        msg: msg
    };
}
