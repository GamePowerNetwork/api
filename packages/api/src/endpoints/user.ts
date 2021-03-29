import { JsonDB } from 'node-json-db';
import {api} from '../index'
import User from '../models/interfaces/user';

// We are making a fake DB for the prototype this is taking the place of the blockchain storage
var Config = require('node-json-db/dist/lib/JsonDBConfig').Config;

// Setup prototype database
const db: JsonDB = new JsonDB(new Config("userDatabase", true, false, '/'));
try {
    db.getData("/user");
} catch(error) {
    // Initialize user
    const user = {coinCount: 0, hasSword: false} as User;
    db.push("/user", user);
};

let userEndpoint = {

    getUser: (data) => {
        console.log(data);
    },

    getData: (data) => {
        const user = db.getObject<User>("/user");

        api.dispatch("userData", {Key: data.Key, Data:user[data.Key]});
    },

    setData: (data) => {
        const user = db.getObject<User>("/user");
        user[data.Key] = data.Value;

        db.push("/user", user);
    },

    incrementData: (data) => {
        const user = db.getObject<User>("/user");
        user[data.Key] += data.Value;

        db.push("/user", user);
    },
}

export default userEndpoint;