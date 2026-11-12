import express from "express";
const router = express.Router();
const SUPPORTED_CITIES = ['London', 'Tokyo', 'New York', 'Sydney', 'Paris']



router.get("/", (req, res) => {
    res.json({"Supported Cities": SUPPORTED_CITIES})
})

router.get("/:city", async (req, res) => {
    const { city } = req.params
    try{
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)
        if (!response.ok) {
            throw new Error(`status ${response.status}`)
        }
        
    const data = await response.json()
    res.json({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed  
    })
} catch (error) {
    res.status(404).json({
        error: error
    })
}
})


export default router;