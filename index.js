const Koa = require('koa');
const app = new Koa();
const Routers = require('./routers');
const BodyParser = require('koa-bodyparser');
const PORT = process.env.PORT || 5000;

app.use(BodyParser())
app.use(Routers.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;