import express from 'express';
import cors from 'cors';
import { default as fetch } from 'node-fetch';

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use(cors());

const porta = process.env.PORT || 3001 

app.listen(porta, () =>{
    console.log('Server runing on port: '+porta)
})


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});



const apikey = "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"

app.post("/back-end/api/openai", async (request, response) => {
    
    const data = request.body
    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${apikey} `
        },
        body: JSON.stringify(data)
    }
    const url = await fetch('https://api.openai.com/v1/chat/completions', options)
    const res = await url.json()

    response.json(res)
})


app.post("/v1/predictions", async (request, response) => {


    const data = request.body.prompt

    const PostData = {"version": "601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f", "input": {"prompt": data}}
    
    const options = {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "authorization": `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`
        },
        body: JSON.stringify(PostData)
      };

      const rec = await fetch('https://api.replicate.com/v1/predictions', options);

      if (rec.status !== 201) {
        let error = await rec.json();
        response.statusCode = 500;
        response.end(JSON.stringify({ detail: error.detail }));
        return;
      }
    
      const prediction = await rec.json();
      response.statusCode = 201;
      response.end(JSON.stringify(prediction));
})




app.get("/v1/predictions/:id", async (request, response) => {
    const photoID =  request.params.id;


    const res = await fetch(
        "https://api.replicate.com/v1/predictions/" + photoID,
        {
          headers: {
            Authorization: `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        let error = await res.json();
        response.statusCode = 500;
        response.end(JSON.stringify({ detail: error.detail }));
        return;
      }
    
      const prediction = await res.json();
      response.end(JSON.stringify(prediction));
})



// This API is for stability - ai

app.post("/v2/predictions", async (request, response) => {


  const data = request.body.prompt

  const PostData = {"version": "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf", "input": {"prompt": data}}
  
  const options = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "authorization": `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`
      },
      body: JSON.stringify(PostData)
    };

    const rec = await fetch('https://api.replicate.com/v1/predictions', options);

    if (rec.status !== 201) {
      let error = await rec.json();
      response.statusCode = 500;
      response.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await rec.json();
    response.statusCode = 201;
    response.end(JSON.stringify(prediction));
})




app.get("/v2/predictions/:id", async (request, response) => {
  const photoID =  request.params.id;


  const res = await fetch(
      "https://api.replicate.com/v1/predictions/" + photoID,
      {
        headers: {
          Authorization: `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status !== 200) {
      let error = await res.json();
      response.statusCode = 500;
      response.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await res.json();
    response.end(JSON.stringify(prediction));
})


// this for image restoration

app.post("/v3/predictions", async (request, response) => {


  const data = request.body.prompt

  const PostData = {"version": "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3", "input": {"img": data}}
  
  const options = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "authorization": `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`
      },
      body: JSON.stringify(PostData)
    };

    const rec = await fetch('https://api.replicate.com/v1/predictions', options);

    if (rec.status !== 201) {
      let error = await rec.json();
      response.statusCode = 500;
      response.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await rec.json();
    response.statusCode = 201;
    response.end(JSON.stringify(prediction));
})




app.get("/v3/predictions/:id", async (request, response) => {
  const photoID =  request.params.id;


  const res = await fetch(
      "https://api.replicate.com/v1/predictions/" + photoID,
      {
        headers: {
          Authorization: `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status !== 200) {
      let error = await res.json();
      response.statusCode = 500;
      response.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await res.json();
    response.end(JSON.stringify(prediction));
})
