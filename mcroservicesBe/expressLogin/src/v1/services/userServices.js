const { send } = require("./rabbitmq");
const axios = require("axios");
const redis = require("../init.redis")

let sendData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryE = JSON.stringify({
        query: {
          term: {
            "email.keyword": `${data.msg.email}`,
          },
        },
      });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:9200/users/_search",
        headers: {
          "Content-Type": "application/json",
        },
        data: queryE,
      };
      const res = await axios.request(config);
    
     
      if(res.data.hits.total.value > 0){
        resolve("0")
      }
      if (res.data.hits.total.value === 0) {
        send("nodejsSend", JSON.stringify(data));
        resolve(true);
      }
     

     
    } catch (e) {
     
      reject(e);
      

    }
  });
};

let readData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
       let queryE = JSON.stringify({
         query: {
           term: {
             "email.keyword": `${data.msg.email}`,
           },
         },
       });
       let config = {
         method: "get",
         maxBodyLength: Infinity,
         url: "http://localhost:9200/users/_search",
         headers: {
           "Content-Type": "application/json",
         },
         data: queryE,
       };
       const res = await axios.request(config);
    
       if (!res.data.hits.hits[0]) {
         resolve({ status: 0 });
       }
    
    if (res.data.hits.hits[0]._source.password === data.msg.password)
     resolve({
       status: true,
       username: res.data.hits.hits[0]._source.username,
       _id: res.data.hits.hits[0]._id,
     });
    else resolve({status:-1});
    

    
    } catch (e) {
      reject(e);
    }
  });
};

let setCache = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await redis.set(data.key, JSON.stringify({number :data.numberMsg,image:data.imageMsg}));
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let getCache = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      redis.exists(data.key, async (err, exists) => {
        if (err) {
          reject(err);
          return;
        }

        if (exists === 1) {
          // Key tồn tại trong Redis, lấy dữ liệu và parse
          redis.get(data.key).then((data) => {
            if (data) {
              const parsedObject = JSON.parse(data);
              resolve(parsedObject);
            } else {
              console.log("Data in Redis is empty");
              resolve(null); // Trường hợp dữ liệu trong Redis là rỗng
            }
          });
        } else {
          console.log("Key not found in Redis");
          resolve(null); // Trường hợp key không tồn tại trong Redis
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};




module.exports = { sendData, readData, getCache, setCache };
