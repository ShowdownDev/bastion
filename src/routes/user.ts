import { Hono } from 'hono'
import { unimplemented } from '../util/unimplemented'

const app = new Hono()

app.get('/user/me', unimplemented)
app.get('/user/:userId', unimplemented)

export default app