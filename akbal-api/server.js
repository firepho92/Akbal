var kraken = require('kraken-js'),
  app = require('express')(),
  server = require('http').Server(app),
  options = {
    onconfig: function (config, next) {
      //any config setup/overrides here
      next(null, config);
    }
  },
  port = process.env.PORT || 8000;

app.use(kraken(options));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


app.listen(port, function (err) {
  console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});