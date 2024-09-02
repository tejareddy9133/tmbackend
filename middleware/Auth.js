const jwt = require("jsonwebtoken");
function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "teja2233", function (err, decoded) {
    if (err) {
      res.status(401).send({ message: "Invalid token" });
    } else {
      req.body = {
        ...req.body, //3 //tasktitle,taskdesc,status
        ...decoded, //2 //userid,username
        date: new Date(),
        created: new Date().getHours() + " : " + new Date().getMinutes(),
      };
      next();
    }
  });
}

module.exports = AuthMiddleware;
