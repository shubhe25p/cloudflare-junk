import { Router } from 'itty-router';
import handleComputeStat from './handlers/computeStat';

const router = Router();

router.get('/README.txt', () => {
	  return new Response('Hello, world!', {status: 200});
});

router.get('/stats', handleComputeStat);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
	fetch: router.handle,
};