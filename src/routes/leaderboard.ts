import { Hono } from 'hono'
import { unimplemented } from '../util/unimplemented'

const app = new Hono()

app.get('/leaderboard/:gameId', unimplemented)
app.get('/leaderboard/private/:orgId/:gameId', unimplemented)
app.get('/leaderboard/day', unimplemented)

export default app