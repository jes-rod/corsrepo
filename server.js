
let express = require('express'),
    cors = require('cors'),
    app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('CORS app running');
});

app.get('/api', cors(), async function (req, res, next) {

    const got = await import('got');

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
        if (!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        const response = await got(targetURL, {headers: {'Authorization': req.header('Authorization')}}).json();
        res.json(response);
    }
});

app.set('port', process.env.PORT || 8001);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});
