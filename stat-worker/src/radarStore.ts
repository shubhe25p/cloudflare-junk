export default class AttackStore {
    async _all() {
      try {
        const url = "https://cfisysapi.developers.workers.dev/stats?timestamp="+Math.round(Date.now()/1000);
        const res = await fetch(url);
        const data = await res.json();
        return data.values;
      } catch (error) {
        console.log(error);
      }
    }
  }