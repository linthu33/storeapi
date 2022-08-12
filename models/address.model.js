const moongoose=require('mongoose');

const AddressSchema=moongoose.Schema({
    fullName: String,
    Phone: String,
    address: String,
    city: String,
    state: String,
    postal: String,
    country: String,
    //isDefault: true
})
module.exports=moongoose.model("Address",AddressSchema);