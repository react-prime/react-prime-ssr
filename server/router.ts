import * as i from 'types';
import routes from 'next-routes';
import appRoutes from './routeNames';

const router = (new routes() as i.Router);
router.push = router.Router.pushRoute;

appRoutes.map(router.add);

export default router;
