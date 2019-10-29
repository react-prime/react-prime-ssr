import * as i from 'types';
import routes from 'next-routes';
import { routeNames } from './routeNames';

const router = (new routes() as i.Router)
  .add({ pattern: '/', page: 'Home', name: routeNames.home });

router.push = router.Router.pushRoute;

export default router;
