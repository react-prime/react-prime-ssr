const routes = require('next-routes');

const router = routes()
  .add({ pattern: '/', page: 'Home', name: 'home' });

router.push = router.Router.pushRoute;

module.exports = router;
