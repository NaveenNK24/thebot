const cspMiddleware = (req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com;");
    next();
  };
  
  module.exports = cspMiddleware;