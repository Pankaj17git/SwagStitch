const mongoose = require('mongoose')

const settingsSchema =  mongoose.Schema({
  discountRules: [
    {
      minAmount: { type: Number, required: true },   // e.g. 5000
      discount: { type: Number, required: true },    // e.g. 0.10 for 10%
      label: { type: String }                        // optional description
    }
  ],
  tax: {
    gst: { type: Number, default: 0.18 },            // e.g. 18% GST
    otherTax: { type: Number, default: 0 }           // extend if needed
  },
  shippingCharge: { type: Number, default: 0 },      // base shipping fee
  freeShippingThreshold: { type: Number, default: 0 } // optional: free above X
}, { timestamps: true });

const Settings = mongoose.model("Setting", settingsSchema);

module.exports = Settings
