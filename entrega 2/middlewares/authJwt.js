import jwt from "jsonwebtoken";
import config from "../config/authConfig.js";
import User from "../models/user.js";
import Role from "../models/role.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "¡No se proporcionó un token!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "¡No autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < role.length; i++) {
          if (role[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "¡Requiere rol de administrador!" });
        return;
      }
    );
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send({ message: "¡No autorizado!" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isAuthenticated
};

export default authJwt;
