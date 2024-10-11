import { Hono } from 'hono'
import { unimplemented } from '../util/unimplemented'

const app = new Hono()

app.get('/bot/:botId', unimplemented)
app.post('/bot', unimplemented)

export default app