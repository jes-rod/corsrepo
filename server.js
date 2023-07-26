let express = require('express'),
    request = require('request'),
    cors = require('cors');
    app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.get('/api', function (req, res, next) {

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
        if (!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        request({ url: targetURL, method: req.method, headers: {'Authorization': req.header('Authorization')} },
            function (error, response, body) {
                if (error) {
                    console.error('error: ' + response.statusCode)
                }
//                console.log(body);
            }).pipe(res);
    }
});

app.set('port', process.env.PORT || 8001);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});
