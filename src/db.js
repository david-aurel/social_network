const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUser = (first, last, email, pass) => {
    return db.query(
        `INSERT INTO users (first, last, email, pass) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, pass]
    );
};

exports.getUser = email => {
    return db
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(({ rows }) => rows);
};

exports.getUserById = id => {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then(({ rows }) => rows);
};

exports.updatePass = (email, pass) => {
    return db.query(`UPDATE users SET pass = $2 WHERE email = $1`, [
        email,
        pass
    ]);
};

exports.updateProfilePic = (url, id) => {
    return db.query(`UPDATE users SET url = $1 WHERE id = $2`, [url, id]);
};

exports.updateBio = (bio, id) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2`, [bio, id]);
};

exports.getMostRecentUsers = async () => {
    const { rows } = await db.query(
        `SELECT id, first, last, url, bio FROM users ORDER BY ID DESC LIMIT 3`
    );
    return rows;
};

exports.getUsersBySearch = async search => {
    const {
        rows
    } = await db.query(
        `SELECT id, first, last, url, bio FROM users WHERE first ILIKE $1`,
        [search + "%"]
    );
    return rows;
};

exports.checkFriendship = async (id1, id2) => {
    const {
        rows
    } = await db.query(
        `SELECT * FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`,
        [id1, id2]
    );
    return rows;
};

exports.makeFriendsRequest = (id1, id2) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2)`,
        [id1, id2]
    );
};

exports.acceptFriendRequest = (id1, id2) => {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`,
        [id1, id2]
    );
};

exports.endFriendship = (id1, id2) => {
    return db.query(
        `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`,
        [id1, id2]
    );
};

exports.getFriendsAndWannabes = async id => {
    console.log("id:", id);

    const { rows } = await db.query(
        `
      SELECT users.id, first, last, url, accepted
      FROM friendships
      JOIN users
      ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
  `,
        [id]
    );
    return rows;
};
