
import admin from "./models/admin";
import user from "./models/User";
import Petition from "./models/Petitions";
import Update from "./models/Update";

const db = {
    admin,
    user,
    Petition,
    Update
}

export default db;
