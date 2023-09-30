import { Request } from 'express';
import { ObjectId } from 'mongoose';

interface DefaultAttributes {
  _doc?: any;
  _id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

type CreateErr = (message: string, code?: number, validations?: object) => Error;

type Token = {
  id: string;
  email: string;
  phoneNumber: string;
}

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}


type AuthenticatedRequest = Request & {
  user: Token;
  admin: IAdmin & { id: string }
  destination?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
};

type AppError = Error & {
  code: number;
  name?: string;
  message: string;
  validations?: object | null;
};

type Fix = any;

export enum ICURRENCIES {
  USD = 'USD',
  NGN = 'NGN'
}

type IRole = 'super-admin' | 'admin' | 'operator';
interface IAdmin extends DefaultAttributes {
  role: IRole;
  email: string;
  address: string;
  lastName: string;
  password: string;
  isActive: boolean;
  firstName: string;
  phoneNumber: string;
}

interface IComments {
  _id: string;
  author: ICommentAuthor;
  content: string;
  date: string;
  likes: string[];
}

type iCategory =
  | 'Human Right'
  | 'Social Policy'
  | 'Criminal Justice'
  | 'Environment Justice'
  | 'Health'
  | 'Politics'
  | 'Discrimination'
  | 'Development'
  | 'Disability';


interface IAdvert extends DefaultAttributes {
  caption: string;
  message: string;
  email: string;
  duration: string;
  link: string;
  action: string;
  audience: string;
  image: string[];
  shares: string[];
  likes: string[];
  promoted: boolean;
  author: string;
  status: string;
  comments: IComments[];
  views: string[]
  numberOfPaidViewsCount: number;
}

interface IEvent extends DefaultAttributes {
  name: string;
  description: string;
  audience: string;
  author: string;
  endDate: String;
  image: String[];
  interested: string[];
  startDate: String;
  time: String;
  type: string;
  shares: string[];
  likes: string[];
  promoted: boolean;
  status: string;
  comments: IComments[];
  views: string[]
  numberOfPaidViewsCount: number;
  category: iCategory;
}

interface IOrgnaization extends DefaultAttributes {
  image: string;
  author: string;
  name: string;
  email: string;
  description: string;
  phone: string;
  followers: string[];
  following: string[];
  operators: Ioperators[];
  facebook: string;
  linkedIn: string;
  instagram: string;
  twitter: string;
  country: string;
  isActive: boolean;
  city: string;
  website: string;
  socketId: string;
}

export interface IEndorsement extends DefaultAttributes {
  author: string;
  petition: ObjectId | string;
  likes: string[];
  body: string;
  likeCount: number;
}

interface IPetition extends DefaultAttributes {
  title: string;
  image: string[];
  aim: string;
  target: string;
  body: string;
  slug: string;
  excerpt: string;
  status: string;
  featured: boolean;
  author: string;
  addedFrom: string;
  category: iCategory;
  endorsements: IEndorsement[];
  endorserIds: string[];
  numberOfPaidEndorsementCount: number;
  numberOfPaidViewsCount: number;
  likes: string[];
  shares: string[];
  comments: IComments[];
  promoted: boolean;
  views: string[];
  updates: UpdateDocument[];
  region: string;
}

interface IUpdate extends DefaultAttributes {
  petition: ObjectId | string;
  body: string;
  image: string[];
  author: string;
  comments: IComments[];
  likes: string[];
  shares: string[];
  views: string[]
  numberOfPaidViewsCount: number;
  category: iCategory;
}

interface IPost extends DefaultAttributes {
  author: string;
  body: string;
  likes: string[];
  shares: string[];
  isPetition: boolean;
  image: string[];
  promoted: boolean;
  status: string;
  comments: IComments[];
  views: string[]
  numberOfPaidViewsCount: number;
  categories: iCategory[];
}

interface IReport extends DefaultAttributes {
  body: string;
  itemId: string;
  itemType: string;
  reportType: string;
  authorName: string;
  authorId: string;
  authorEmail: string;
  authorImage: string;
  resolved: boolean;
}


interface IShare extends DefaultAttributes {
  body: string;
  likes: string[];
  itemId: string;
  itemType: string;
  itemBody: string;
  itemImage: string[];
  comments: IComments[];
  views: string[];
  numberOfPaidViewsCount: number;
  authorName: string;
  authorId: string;
  authorEmail: string;
  authorImage: string;

  creatorName: string;
  creatorId: string;
  creatorEmail: string;
  creatorImage: string;
  creatorDescription: string

}

interface ITransaction extends DefaultAttributes {
  message: string;
  reference: string;
  status: string;
  transaction: string;
  amount: number;
  user: ObjectId | string;
  transactionId: number;
  paid_at: string;
  created_at: string;
  channel: string;
  purpose: string;
  key: string;
  name: string;
}

interface IUser extends DefaultAttributes {
  name: string;
  googleId: string;
  facebookId: string;
  accountType: string;
  image: string;
  firstName: string;

  lastName: string;
  description: string;
  otherName: string;
  email: string;
  password: string;
  phone: string;
  emailToken: string;
  emailVerified: boolean;
  isActive: boolean;
  role: string;
  address: string;
  reps: string[];
  suppervisor: User;
  reportCount: number;
  applicantCount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  country: string;
  state: string;
  city: string;
  lastSeen: string;
  followers: string[];
  following: string[];
  orgOperating: string[];
  createdOrg: boolean;
  interests: string[];
  socketId: string;
}

interface IVictory extends DefaultAttributes {
  body: string;
  image: string[];
  shares: string[];
  likes: string[];
  author: string;
  status: string;
  comments: IComments[];
  views: string;
}

interface MessageUser{
  _id: string;
  name: string;
  email: string;
  image: string;
  description: string;
}


interface IOneToOneMessage extends DefaultAttributes {
  participants: string[]
  messages: IMesssage[]
  users: MessageUser[]
  type: string;
  reviews: IReview[]
}

enum MessageType {
  TEXT = 'text',
  FILE = 'file',
}

interface ISendDM {
  category: string;
  subCategory: string;
  country: string;
  city: string;
  userId: string;
  message: string;
}
