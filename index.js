import express from 'express';
import weatherRouter from "./weather.js";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use("/api/weather", weatherRouter)
app.use(express.static(path.join(__dirname, "public")))

app.get("/api/info", (req, res) => {
    res.json({ 
        "name": "Weather Service API",
        "version": "1.0.0",
        "description": "A simple weather service API that provides weather information for supported cities.",
        "endpoints": ["/api/weather", "/api/status", "/api/greet/:name", "/api/data"] 
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})


app.get("/api/status", (req, res) => {
    res.status(200).json({ "status": "API is running" } )
})

app.get("/docs", (req, res) => {
    res.redirect("/api/info")
})

app.get("/api/greet/:name", (req, res) => {
    const name = req.params.name
    res.json({name: `Hello, ${name}! Welcome to the Weather API`})
})

app.route("/api/data")
    .get((req, res) => {
        res.json({ "data": "This is some weather data" })
    })
    .post((req, res) => {
        res.status(201).json({
            "message": "Data Has Been Created"
        })
    })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})