import express, { Express, Request, Response } from "express"
import { createPeopleDB, createProductDB } from './fakerDB'
import dotenv from "dotenv"

const peopleDB = createPeopleDB(500)
const productDB = createProductDB()

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
	res.send("Express Boobies WTF !!")
})

app.get("/users", (req: Request, res: Response) => {
	res.setHeader('content-type', 'application/json')
	res.json({ "people": peopleDB })
})

app.get("/products", (req: Request, res: Response) => {
	res.setHeader('content-type', 'application/json')
	res.json({ "products": productDB })
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
