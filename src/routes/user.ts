import { Hono } from 'hono'
import { unimplemented } from '../util/unimplemented'
import { auth } from '../util/auth'

const app = new Hono()

app.get('/user/me', auth, (ctx) => {
    return ctx.json(ctx.var.user)
})
app.get('/user/:userId', unimplemented)

export default app