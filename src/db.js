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
