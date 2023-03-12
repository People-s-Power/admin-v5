import { Request } from 'express';
import { ObjectId } from 'mongoose';

interface DefaultAttributes {
  _doc?: any;
  _id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser extends DefaultAttributes {
  city: string;
  email: string;
  state: string;
  country: string;
  address: string;
  lastName: string;
  password: string;
  firstName: string;
  isActive: boolean;
  postalCode: string;
  phoneNumber: string;
  lastLoggedIn: string;
  isAdmin: boolean;
  isSubAdmin: boolean;
  cart: ICARTITEM[];
  wishList: IWISHLIST[]
}

export interface ICARTITEM {
  productId: string;
  price: number;
  name: string;
  image: string
  quantity: number;
  color: string;
  specId: string;
}

export interface IWISHLIST {
  productId: string;
  name: string;
  image: string;
  specId: string;
  price: number;
}

type BusinessHours = {
  monday: {
    open: number;
    close: number;
  }
  tuesday: {
    open: number;
    close: number;
  }
  wednessday: {
    open: number;
    close: number;
  }
  thursday: {
    open: number;
    close: number;
  }
  friday: {
    open: number;
    close: number;
  }
  saturday: {
    open: number;
    close: number;
  }
  sunday: {
    open: number;
    close: number;
  }
}

type Amenities = {
  wifi: boolean;
  freePark: boolean;
  guidedTour: boolean;
  scieneMuse: boolean;
  groupVisit: boolean;
  petFriendly: boolean;
  cardPayment: boolean;
  reservation: boolean;
  familyFriend: boolean;
  retailDinning: boolean;
  freeAdmission: boolean;
  wheelchairAccessibility: boolean;
}

type SocialMedia = {
  twitter: string;
  facebook: string;
  whatsApp: string;
  instagram: string;
}

interface IListing extends DefaultAttributes {
  logo: string;
  city: string;
  title: string;
  state: string;
  tags: string[];
  country: string;
  address: string;
  website: string;
  summary: string;
  category: string;
  author: ObjectId;
  isActive: boolean;
  postalCode: string;
  description: string;
  contactEmail: string;
  totalReview?: number;
  averageReview?: number;
  amenities: Amenities;
  headerImages: string[];
  photoGallery: string[];
  contactPhoneNumber: string;
  businessHours: BusinessHours;
  socialMediaLinks: SocialMedia;
}

interface ICategory extends DefaultAttributes {
  name: string;
  section: string[];
  isActive: boolean;
}

type AmenitiesRatings = {
  wifi: number;
  freePark: number;
  guidedTour: number;
  location?: number;
  ambience?: number;
  price?: number;
  service?: number;
  scieneMuse: number;
  groupVisit: number;
  petFriendly: number;
  cardPayment: number;
  reservation: number;
  familyFriend: number;
  retailDinning: number;
  freeAdmission: number;
  wheelchairAccessibility: number;
}

type ReviewType = 'listing' | 'event' | 'shop';

interface IReview extends DefaultAttributes  {
  rating: number;
  content: string;
  type: ReviewType;
  creator: ObjectId;
  customer: ObjectId;
  reviewTypeId: ObjectId;
  creatorResponse: string;
  amenitiesRatings: AmenitiesRatings
}

type CreateErr = (message: string, code?: number, validations?: object) => Error;

type Token = {
  id: string;
  email: string;
  phoneNumber: string;
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

// Shop types

export enum SHOPCATEGORIES {
  GAMING = 'GAMING',
  SUPERMARKET = 'SUPERMARKET',
  HOMEOFFICE = 'HOMEOFFICE',
  PHONETABLES = 'PHONETABLES',
  CAMPING = 'CAMPING',
  COMPUTING = 'COMPUTING',
  ELECTRONICS = 'ELECTRONICS',
  FASHION = 'FASHION',
  BABYPRODUCTS = 'BABYPRODUCTS',
  SPORTING = 'SPORTING',
  AUTOMOBILE = 'AUTOMOBILE',
  OTHERCATEGORIES = 'OTHERCATEGORIES'
}

export enum SHOPTAGS {
  ACCESSORIES = 'Accessories',
  AGRO = 'Agro',
  ART = 'Art',
  BREAKFAST = 'Breakfast',
  BRUNCH = 'Brunch',
  CAMPING = 'Camping',
  COSMETICS = 'Cosmetics',
  DESIGNER = 'Designer'
}

export enum ICURRENCIES {
  USD = 'USD',
  NGN = 'NGN'
}

/**
 *
 * create an array of varations where unique properties would live eg color, price
 * Each product has a single spec
 * product get added to the cart & wishlist by their varId and prodId
 */
export interface IPRODUCT extends DefaultAttributes {
  name: string;
  price: number;
  currency: ICURRENCIES;
  detail: string;
  subDetail: string;
  addInfo: string;
  category: SHOPCATEGORIES;
  tags: string[];
  sku: string;
  rating: IRATING[];
  images: string[];
  reviews: IREVIEWS[];
  views: number;
  totalReview?: number;
  checkOut: ICHECKOUT[];
  averageReview?: number;
  checkOut: IPRODUCTCHECKOUT[];
  quantity: number;
  isDiscount: boolean;
  discountPrice: number;
  author: ObjectId;
  spec: ISpec[]
  // Specifications

}

interface ISpec {
  id?: string;
  unitPrice: number;
  quantity: number;
  productLine?: string;
  model?: string;
  ProductionCountry?: string;
  weight?: number;
  color?: string;
  size?: string;
  productionLine?: string;
  mainMaterial?: string;
  fromManufacturer?: string;
  careLabel?: string;
  certifications?: string;
  features?: string;
  NAFDAC?: string;
}

export interface ISpecifications {
  productLine?: string;
  model?: string;
  ProductionCountry?: string;
  weight?: number;
  color?: string;
  size?: string;
  productionLine?: string;
  mainMaterial?: string;
  fromManufacturer?: string;
  careLabel?: string;
  certifications?: string;
  features?: string;
  NAFDAC?: string;
}

export interface IDISCOUNT {
  isDiscount: boolean;
  discountPrice: number;
}

export interface ICREATEPRODUCT {
  name: string;
  price: number;
  currency: ICURRENCIES;
  detail: string;
  subDetail: string;
  addInfo: string;
  category: SHOPCATEGORIES;
  tags: string[];
  images: string[];
  spec: ISpec[];
  quantity: number;
  isDiscount?: boolean;
  discountPrice?: number;
  author?: ObjectId;
}

export interface IADDCART {
  specId: string;
  userId: string;
  quantity: number;
  productId: string;
}

interface IRATING {
  userId: string;
  rating: number;
}

interface IPRODUCTCHECKOUT {
  userId: string;
  checkoutId: string;
}
interface IREVIEWS {
  userId: string;
  body: string;
}

// REcently viewed products
interface  IRECENTVIEWS {
  userId: string;
  items: RECENTITEMS[]
}

interface RECENTITEMS {
  productId: string;
  createdAt: string;
}

// Billing

export interface IBILLING {
  userId: string;
  billing: IDETAILS;
  delivery: IDETAILS;
}

export interface IDETAILS {
  fullName: string;
  email: string;
  country: string;
  town: string;
  street: string;
  company?: string;
  phone: number;
  postCode: number;
}

// Orders

export interface IORDER extends DefaultAttributes {
  fees: number;
  name: string;
  reference: string;
  author: IUser;
  type: string;
  gross: number;
  total: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productItems: ICARTITEM[];
  eventIds: string[];
  billingDetailsId: string;
  status: string;
}
export interface ICHECHOUT extends DefaultAttributes{
  orderId: string;
  paid: string;
  billingId: string;
  amount: number;
  tx_ref: string;
}

interface IEvent extends DefaultAttributes {
  type: string;
  city: string;
  title: string;
  state: string;
  venue: string;
  gross: number;
  tags: string[];
  endDate: string;
  country: string;
  summary: string;
  author: ObjectId;
  timezone: string;
  category: string;
  startDate: string;
  isActive: boolean;
  ticketSold: number;
  postalCode: string;
  eventImage: string;
  eventVideo: string;
  description: string;
  location: ILocation;
  ticketId?: ObjectId[];
  isRecurring: boolean;
  organizerBio: string;
  totalReview?: number;
  organizerLogo: string;
  organizerName: string;
  bannerPhoto: string[];
  averageReview?: number;
  organizerWebsite: string;
}

interface ITicket extends DefaultAttributes {
  name: string;
  amount: number;
  isPaid: boolean;
  endDate: string;
  timezone: string;
  quantity: number;
  author: ObjectId;
  startDate: string;
  eventId: ObjectId;
  isActive: boolean;
  visibility: boolean;
  description: string;
  minimumSellingQuantity: number;
  maximumSellingQuantity: number;
}

type OrderStatus = 'completed' | 'cancelled' | 'pending';

interface IOrder extends DefaultAttributes {
  name: string; // product title_ticket name
  fees: number;
  gross: number;
  total: number;
  quantity: number;
  author: ObjectId;
  reference: string;
  type: PaymentType;
  unitPrice: number;
  ticketId?: ObjectId;
  status: OrderStatus;
  eventIds?: ObjectId[];
  productItems?: ICARTITEM[];
  billingId?: string;
}

interface ICoupon extends DefaultAttributes {
  name: string;
  code: string;
  isActive: boolean;
}

type PaymentMethod = 'bankTransfer' | 'cashOnDelivery' | 'payWithCard' | 'free';
type PaymentType = 'event' | 'listing' | 'shop';

interface IPayment extends DefaultAttributes {
  fees: number;
  amount: string;
  author: ObjectId;
  type: PaymentType;
  orderId: ObjectId;
  reference: string;
  method: PaymentMethod;
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

type DevicePlatform = 'ios' | 'android' | 'web';

interface IView extends DefaultAttributes {
  author: ObjectId;
  eventId: ObjectId;
  listingId: ObjectId;
  productId: ObjectId;
  platform: DevicePlatform;
}

export interface IDeals extends DefaultAttributes {
  name: string;
  startDate: string;
  endDate: string;
  products: string[];
  live: boolean;
  percentage: number;
}
