export default class TrafficStore {
  async _allHTTPs(env) {
    
    try {
      var resHttp=[];
      for(let i=0;i<31;i++){
        const response = await env.HTTPREQKV.get(i.toString());
        resHttp.push(JSON.parse(response));
      }
      return resHttp;
    } catch (error) {
      console.log(error);
    }
  }
  async _allTotal(env) {
      
      try {
        var resTotal=[];
        for(let i=0;i<31;i++){
          const response = await env.TOTALREQKV.get(i.toString());
          resTotal.push(JSON.parse(response));
        }
        return resTotal;
        
      } catch (error) {
        console.log(error);
      }
    }
}