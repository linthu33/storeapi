const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User.model");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

module.exports = (app) => {
  const product_com = require("../contollers/product.com");
  const category_com = require("../contollers/category.controller");
  const fileupload = require("../contollers/fileupload.con");
  const orderproduct = require("../contollers/orderporoduct.controller");
  //#region User route
  app.post("/register", (req, res) => {
    console.log("register data", req.body);
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      if (user)
        res.status(400).json({
          message: { msgBody: "Username is already taken", msgError: true },
        });
      else {
        const newUser = new User({ username, password, role });
        newUser.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(201).json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
        });
      }
    });
  });

  app.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
      if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res
          .status(200)
          .json({ isAuthenticated: true, user: { username, role } });
      }
    }
  );
  app.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.clearCookie("access_token");
      res.json({ user: { username: "", role: "" }, success: true });
    }
  );
  //for authentication
  app.get(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (req.user.role === "admin") {
        res
          .status(200)
          .json({ message: { msgBody: "You are an admin", msgError: false } });
      } else
        res.status(403).json({
          message: { msgBody: "You're not an admin,go away", msgError: true },
        });
    }
  );

  app.get(
    "/authenticated",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { username, role } = req.user;
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  );
  //#endregion

  //#region  upload image for product
  app.post("/uploadImage", fileupload.uploadImage);

  //#region Category Contoller
  app.post("/createcategory", category_com.create);
  app.get("/findOnecategory", category_com.findOne);
  app.get("/findAllcategory", category_com.findAll);
  //#endregion
  //#region Product Contoller
  app.get("/findOneprod", product_com.findOneprod);
  app.get("/findAllprod", product_com.findAllprod);
  app.post("/createprod", product_com.createprod);
  app.post("/editprod", product_com.updateprod);
  app.delete("/deleteprod/:id", product_com.deleteprod);

  //#endregion
  //#region Order to Product Route
  app.post("/orderproduct", orderproduct.orcreate);
  app.get("/orderfindone", orderproduct.orfindone);
  app.get("/orderfindall", orderproduct.orfindall);
  app.delete('/orderdelete',orderproduct.ordelete);
  /*  app.post('/opupdate',orderproduct.opupdate);
      */
  //#endregion
};
