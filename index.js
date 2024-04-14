// A express server , which will handel a api requests coming in and responds with a jason object, it will use a body parser as well as cross 

const OpenAI = require('openai');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3005;
const openai = new OpenAI({
    organization: "org-Ayp0Nf9ntKzAfWvX9wjRWw98",
    apiKey: "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"
});

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const {message}=req.body;
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Pretend you are a chatbot assistant. you will be helping users with their questions. You have to do all the tasks as chatgpt
        ${message}`,
        max_tokens: 100,
        temperature: 0,
      });
    console.log(response.choices[0].text);
res.json({ message: response.choices[0].text });
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:%d', port);
}); 

app.post('/image', async (req, res) => {
    const {image}=req.body;
    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: `${image}`,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data[0].url;
res.json({ image: image_url });
});