import Store from '../attack_store';

const handleAttackLayerChange = async (req, env, ctx) => {
  const attackLayerChangeJSON = new Store();
  const body = await attackLayerChangeJSON._all(env);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  const obj = {
    data: body,
    meta: {}
  }
  return new Response(JSON.stringify(obj), { headers });
};

export default handleAttackLayerChange;
