import { Router } from 'itty-router';
import handleTrafficChange from './handlers/trafficChange';
import handleDomainChange from './handlers/popularDomain';
import handleAttackLayerChange from './handlers/attackLayer3';



const router = Router();
router.get('/traffic-change', handleTrafficChange);
router.get('/popular-domain', handleDomainChange);
router.get('/attack-layer3', handleAttackLayerChange);

// Redirect root request to the /docs page
router.get('/', request => new Response('Hello World!', { status: 200 }));

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
	fetch: router.handle,
};
