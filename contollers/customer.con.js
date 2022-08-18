const CustomerModel = require("../models/Customer.model");
exports.create = async (req, res, next) => {
  try {
    const customeradata = new CustomerModel({
      fullName: req.body.fullName,
      isDefault: "",
      address: arraypush(req.body.address),
    });
    await customeradata.save();
    res.status(200).json({
      message: "create sucessfully",
      customer: customeradata,
    });
  } catch (err) {
    res.status(500).send("do not sucessfully");
  }
};
exports.findone = async (req, res, next) => {
  try {
    const findcustomer = await CustomerModel.find({ _id: req.body.id });

    if (!findcustomer) {
      return res.status(404);
    }
    res.status(200).json(findcustomer);
  } catch (err) {
    res.status(500).send(error);
  }
};
exports.findall = async (req, res, next) => {
  try {
    const findcustomer = await CustomerModel.find({});

    if (!findcustomer) {
      return res.status(404);
    }
    res.status(200).send(findcustomer);
  } catch (err) {
    res.status(500).send(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const updatedata = await CustomerModel.findByIdAndUpdate(req.body.id, {
      fullName: req.body.fullName,
      isDefault: "true",
      address: {},
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
function arraypush(arr) {
  let arrdata = [];
  //console.log("address list",arr)
  for (list of arr) {
    arrdata.push(list);
  }
  //console.log("console ", list);
  return arrdata;
}
