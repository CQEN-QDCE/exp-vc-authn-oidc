const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const HOST_URL = process.env.REACT_APP_ISSUER_HOST_URL || 'http://vc-authn-agent-admin.apps.exp.lab.pocquebec.org/';
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 10000
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.use(express.static(path.join(__dirname, 'build')));

app.use(
    '/api/connections',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/api/connections': '/connections', // rewrite path
        }
    })
);

app.use(
    '/api/issue-credential',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/api/issue-credential': '/issue-credential', // rewrite path
        }
    })
);

app.use(
    '/api/credential-definitions',
    createProxyMiddleware({
        target: HOST_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/api/credential-definitions': '/credential-definitions', // rewrite path
        }
    })
);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, ip)