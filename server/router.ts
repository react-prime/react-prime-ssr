import * as i from 'types';
import routes from 'next-routes';
import appRoutes from './routes';

const router = new routes() as i.Router;
router.push = router.Router.pushRoute;

appRoutes.map((route) => router.add(route));

export default router;
