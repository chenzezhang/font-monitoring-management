const Router = require('koa-router');
const compose = require('koa-compose');
const fetch = require('whatwg-fetch');
const path = require('path');

const router = new Router({
    prefix: '/login'
});

router
    .get('/', async (ctx, next) => {

        ctx.path = path.resolve(__dirname, '..');
        
        ctx.locals = {
            name: 'lalala'
        };
        await next();
    });

module.exports = () => compose([
    router.routes(),
    router.allowedMethods()
]);