const Redis = require("ioredis");


const redis = new Redis({
  host: "localhost", // Thay đổi host và cổng nếu cần
  port: 6379,
});

redis.on("error", function (error) {
  console.error(error);
});


module.exports = redis;