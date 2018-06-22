require('dotenv').config();

const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  axios = require('axios'),
  PORT = 3000

const apiKey = 'PgdxZO2vGJjuvSSZcOd9mEZqXnVaOBZP'

// builds an object that can make HTTP requests:
const apiClient = axios.create()

app.get("/", (req, res) => {
    console.log("REQUEST RECEIVED, CONTACTING NASA...")
    const apiUrl = 'http://api.open-notify.org/iss-now.json'
    apiClient({ method: "get", url: apiUrl }).then((dataThatCameBack) => {
      console.log(dataThatCameBack.data.iss_position.longitude)
    })
  })

app.get("/random", (req, res) => {
    const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=G`
    apiClient({ method: "get", url: apiUrl }).then((apiResponse) => {
        var imgUrl = apiResponse.data.data.image_original_url
       
        res.send(`<img src="${imgUrl}">`)
    })
})

app.get('/search/:term', (req, res) => {
    var term = req.params.term

    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${term}&limit=25&offset=0&rating=G&lang=en`
    
    apiClient({ method: "get", url: apiUrl }).then((apiResponse) => {
        console.log(apiResponse.data.data[0].images)
        // var imgUrl = apiResponse.data.data.images.original.url
        let results = ''

        apiResponse.data.data.forEach((r) => {
            let imgUrl = r.images.original.url
            results += `<img src="${imgUrl}">`
        })

        res.send(results)
    })
})

app.listen(PORT, (err) => {
  console.log(err || `Server running on ${PORT}.`)
})