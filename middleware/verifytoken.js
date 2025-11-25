
    const jwt = require('jsonwebtoken');
    verifyToken = (req, res, next) => {
      const token = req.cookies.token;
      if (!token) return res.render("frontpage.ejs");
      try {
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        req.user=verified;
        next();
      } catch {
        res.status(400).send("invalid token");
      }
    };
    module.exports=verifyToken;


     