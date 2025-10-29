import express from 'express'
import cors from  'cors'


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get("/" ,async (req ,res) => {
    const data = req.body
    console.log(data)
    res.send("Data received")
})
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
