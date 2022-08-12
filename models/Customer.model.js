const moongoose = require("mongoose");
//const Address = require("../models/address.model").AddressSchema;
const CustomerSchema = moongoose.Schema(
  {
    fullName: String,
    isDefault:String,
    address: [
      {
        phone: String,
        city: String,
        state: String,
        postal: String,
        country:String,
      }
    ],
   
   
  },
  {
    timestamps: true,
  }
);

module.exports = moongoose.model("Customer", CustomerSchema);
