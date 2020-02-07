import axios from "./axios";

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
        type: "GET_FRIENDS_AND_WANNABES",
        friendsWannabes: data
    };
}

export async function acceptFriendsRequest(id) {
    await axios.post(`/accept-friendship/${id}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: id
    };
}

export async function endFriendship(id) {
    await axios.post(`/accept-friendship/${id}`);
    return {
        type: "END_FRIENDSHIP",
        id: id
    };
}