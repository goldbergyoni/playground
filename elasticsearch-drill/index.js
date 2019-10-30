const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const startTheMagic = async () => {
    //const pingResult = await client.ping();
    //console.log(pingResult);
    //const pingResult = await client.cluster.health();
    //console.log(pingResult);
    //client.indices.create({index: "tracker"});
    // const result = await client.index({index:"trackers" , type:"cars" , body:{
    //     color:'red', year:1990, desc: "im yoni goldberg and i live in haifa"
    // }})
    const result = await client.search({index: 'trackers',
    type: 'cars',
    body: {
      query: {
        wildcard:{desc:"yoni"}
      },
    }});
    console.log(result);
}

startTheMagic()