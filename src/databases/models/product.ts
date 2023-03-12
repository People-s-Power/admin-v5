import { Schema } from "mongoose";
import { ICURRENCIES, IPRODUCT } from "../../types";
import { db } from "../connection";

const ProductSchema: Schema = new Schema<IPRODUCT>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  subDetail: {
    type: String,
    required: true
  },
  addInfo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  totalReview: {
    type: Number,
    default: 0
  },
  averageReview: {
    type: Number,
    default: 0.0
  },
  tags: [
    {
      type: String,
      required: true
    },
  ],
  sku: {
    type: String,
    required: true
  },
  rating: [
    {
      userId: {
        type: Schema.Types.ObjectId, ref: 'User'
      },
      rating: {
        type: Number
      }
    }
  ],
  images: [
    {
      type: String
    }
  ],
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId, ref: 'User'
      },
      body: {
        type: Number
      }
    }
  ],
  views: {
    type: Number,
    default:  0
  },
  checkOut: [
    {
      userId: {
        type: Schema.Types.ObjectId, ref: 'User'
      },
      checkoutId: {
        type: Schema.Types.ObjectId, ref: 'Checkout'
      }
    }
  ],
  quantity: {
    type: Number,
    default: 0
  },
  isDiscount: {
    type: Boolean,
    default: false
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId, ref: 'Admin'
  },

  // Specifications

  spec: [
    {
      productLine: {
        type: String,
        default: 'Fill this'
      },
      model: {
        type: String,
        default: 'Fill this'
      },
      ProductionCountry: {
        type: String,
        default: 'Fill this'
      },
      weight: {
        type: Number,
        default: 0
      },
      unitPrice: {
        type: Number,
        default: 0
      },
      quantity: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: 'Fill this'
      },
      size: {
        type: String,
        default: 'Fill this'
      },
      productionLine: {
        type: String,
        default: 'Fill this'
      },
      mainMaterial: {
        type: String,
        default: 'Fill this'
      },
      fromManufacturer: {
        type: String,
        default: 'Fill this'
      },
      careLabel: {
        type: String,
        default: 'Fill this'
      },
      certifications: {
        type: String,
        default: 'Fill this'
      },
      features: {
        type: String,
        default: 'Fill this'
      },
      NAFDAC: {
        type: String,
        default: 'Fill this'
      }
    }
  ]

})

ProductSchema.set('timestamps', true)

export default db.model<IPRODUCT>('Product', ProductSchema)
