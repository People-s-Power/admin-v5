
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
import Activity from "./models/Activity";
import Subscriptionprof from "./models/Subscription";
import Withdraws from "./models/Withdrawal";
import Wallet from "./models/Wallet";
import WalletTransaction from "./models/WalletTx";
import Task from "./models/Task";
import Review from "./models/Review";

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
    Activity,
    Subscriptionprof,
    Withdraws,
    Wallet,
    WalletTransaction,
    Task,
    Review
}

export default db;
