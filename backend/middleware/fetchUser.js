const jwt = require("jsonwebtoken");
const JWT_SECRET = "IAmTheBest"

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if(!token){
    return res.status(404).send("token not found")
  }

  try{
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode;
  }catch(err){
    return res.send(err);
  }

  next();
}

module.exports = fetchUser;