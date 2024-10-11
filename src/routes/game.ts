import { Hono } from 'hono'
import { unimplemented } from '../util/unimplemented'

const app = new Hono()

app.get('/games', unimplemented)
app.get('/game/:id', unimplemented)
app.get('/game/day', unimplemented)

export default app