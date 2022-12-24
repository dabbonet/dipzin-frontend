const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')
const express = require('express')
const { createServer } = require('vite')

async function createServer() {
    const app = express()

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares)

    app.use('*', async (req, res) => {
        // serve index.html - we will tackle this next
    })

    app.listen(5173)
}

createServer()