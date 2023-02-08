export default class DomainStore {
    async _all(env) {

   try {
      var res=[];
      for(let i=0;i<15;i++){
        const response = await env.DOMAINKV.get(i.toString());
        res.push(JSON.parse(response));
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  }