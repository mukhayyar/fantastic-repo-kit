const express = require("express");
const axios = require("axios");
const redis = require("redis");
const { promisify } = require("util");
const app = express();

const redisPort = 6379;
const redisClient = redis.createClient(redisPort);

redisClient.on("error", (err) => {
    console.error(err);
});
redisClient.on("ready", () => {
    console.log("Redis is ready");
});
const getAsync = promisify(redisClient.get).bind(redisClient);
app.get("/jobs", async (req, res) => {
    await redisClient.connect();
    const searchTerm = req.query.search;
    try {
        const cachedData = JSON.parse(await getAsync(searchTerm));
        if(cachedData) {
            data = cachedData;
            res.status(200).send({
                jobs: data,
                message: 'success'
            });
        } else {
            const news = await axios.get(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json`);
            redisClient.set(searchTerm, 600, JSON.stringify(news.data));
            res.status(200).send({
                jobs: data,
                message: 'success'
            });
        }

    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(process.env.PORT || 3001, () => {
    console.log("Node server started");
});