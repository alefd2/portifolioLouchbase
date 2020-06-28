const express = require('express'); //
const nunjucks = require('nunjucks');

const server = express();

const videos = require("./data");
//config css
server.use(express.static('public'))
//config a engine njk    
server.set("view engine", "njk")

// pages config
nunjucks.configure("views", {
    express: server,
});

// roots pages
server.get('/', (req,res)=> {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/46423825?s=460&u=ead1640b97305679a71c8fb723ef1fe43f4dac9a&v=4",
        name: "Alef Oliveira",  
        role: "Estudante de Economia e programação",
        description: "Formado em contabilidade,  sou um intusiasta de tecnologia a qual estudo veementemente metodos de programação",
        links: [
            {name: "Github", url:"https://github.com/alefd2"},
            {name: "Twitter", url:"https://twitter.com/alefoliv1"},
            {name: "Github", url: "https://www.linkedin.com/in/alef-oliveira-21a68713a/"}
        ]
    }

    return res.render("about", { about: about })
})

server.get('/portifolio', (req,res)=> {
    return res.render("portifolio", { items: videos })
})

server.get("/video", (req, res) => {
    const id = req.query.id;

    const video = videos.find( (video) => {
       return video.id == id
    })
    if(!video) {
        res.send("Video not found (404)")
    }

    res.render("video", { item: video })
});

//server 5000
server.listen(5000, () => {
    console.log("server is running")
});