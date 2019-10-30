import * as i from 'types';
import routes from 'next-routes';
import { routeNames } from './routeNames';

const router = (new routes() as i.Router)
  .add({ pattern: '/', page: 'home', name: routeNames.home })
  .add({ pattern: '/', page: 'data', name: routeNames.data });

router.push = router.Router.pushRoute;

export default router;
