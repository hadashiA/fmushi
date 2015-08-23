"use strict";

const koa     = require('koa');
const hbs     = require('koa-hbs');
const serve   = require('koa-static');
const logging = require('koa-logger');

const app = koa();

app.use(logging());

app.use(serve('public'));

app.use(hbs.middleware({
  viewPath: `${__dirname}/views`
}));

app.use(function *() {
  yield this.render('index');
});

app.listen(3000, function() {
  console.log("Koa server listening on port 3000");
});
