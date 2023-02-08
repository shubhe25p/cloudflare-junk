import Store from '../traffic_store';

const handleTrafficChange = async (req, env, ctx) => {
  const trafficChangeJSON = new Store();
  const bodyHTTP = await trafficChangeJSON._allHTTPs(env);
  const bodyTotal = await trafficChangeJSON._allTotal(env);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  const json = {
    data: {
      total: bodyTotal,
      https: bodyHTTP
    },
    meta: {}
  };
  return new Response(JSON.stringify(json), { headers }); };

export default handleTrafficChange;
