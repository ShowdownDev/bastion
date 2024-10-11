import { Hono } from 'hono'

import bot from './routes/bot'
import game from './routes/game'
import leaderboard from './routes/leaderboard'
import user from './routes/user'

const app = new Hono()

app.route('/', bot)
app.route('/', game)
app.route('/', leaderboard)
app.route('/', user)

export default app