import Store from '../domain_store';

const handleDomainChange = async (req, env, ctx) => {
  const domainChangeJSON = new Store();
  const body = await domainChangeJSON._all(env);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  };
  const obj={
    rankingEntries: body
  }
  return new Response(JSON.stringify(obj), { headers });
};

export default handleDomainChange;
