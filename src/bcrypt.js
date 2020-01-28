const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt;
const { promisify } = require("util");

genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

export let comparePass = compare;
export function hashPass(plainTextPass) {
    genSalt().then(salt => hash(plainTextPass, salt));
}
