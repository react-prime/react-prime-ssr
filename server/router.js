const routes = require('next-routes');

const router = routes()
  .add({ pattern: '/', page: 'Prime', name: 'prime' });

router.push = router.Router.pushRoute;

module.exports = router;
