const express = require('express');
require("dotenv").config();
const {Configuration, OpenAIApi} = require('openai');

const app = express();

app.use(express.json());
const configuration = new Configuration({
    apiKey : process.env.OPEN_AI_KEY
});
const openai = new OpenAIApi(configuration);
app.get('/', async(req, res)=>{
    try{
        const response= await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: "Balas dengan singkat. Kenapa manusia bermimpi?"}],
            max_tokens:60,
            // stop: ['\n']
        })
        return res.status(200).json({
            success:true,
            data: response.data.choices[0].message
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            data: error.response ? error.response.data :"problem on server"
        })
    }
    
})
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server running in port ${port}`);
})