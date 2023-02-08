export default class AttackStore {
    async _all(env) {
      try {
        var res=[];
        for(let i=0;i<31;i++){
          const response = await env.ATTACKL3KV.get(i.toString());    
          res.push(JSON.parse(response));
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  }