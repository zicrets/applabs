import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import pkg from 'pg'
import axios from 'axios'
import { GITHUB_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, DATABASE_URL } from './config.js'

const { Pool } = pkg
const app = express()
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || DATABASE_URL
})

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'api' })
})

app.post('/login', (req, res) => {
  const { username } = req.body
  const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

app.get('/users', async (_, res) => {
  const { rows } = await pool.query('SELECT id, name, email FROM users ORDER BY id LIMIT 5;')
  res.json(rows)
})

app.get('/enrich', async (_, res) => {
  // Call the Python service for enrichment
  try {
    const r = await axios.get('http://pyservice:8000/enrich?item=demo')
    res.json(r.data)
  } catch (e) {
    res.status(502).json({ error: 'pyservice unavailable' })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`API listening on ${port}`))
