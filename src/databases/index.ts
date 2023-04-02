
import admin from "./models/admin";
import user from "./models/User";
import Petition from "./models/Petitions";
import Update from "./models/Update";
import Event from "./models/Event";
import Post from "./models/Post";
import Victory from "./models/Victory";
import Report from "./models/Report";
import Share from "./models/Share";
import Organization from "./models/Organization";
import Transaction from "./models/Transaction";
import Advert from "./models/Advert";
import Message from "./models/Message";

const db = {
    admin,
    user,
    Petition,
    Update,
    Organization,
    Advert,
    Transaction,
    Event,
    Post,
    Victory,
    Report,
    Share,
    Message,
}

export default db;
