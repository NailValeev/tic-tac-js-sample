const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('dotenv').config()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => {
      app.render(req, res, '/index')
    })
    server.get('/userstats', (req, res) => {
      app.render(req, res, '/usersStatistics')
    })
    server.get('/projectstats', (req, res) => {
      app.render(req, res, '/projectsStatistics')
    })
    server.get('/plans', (req, res) => {
      app.render(req, res, '/plannedTimes')
    })
    server.get('/trends', (req, res) => {
      app.render(req, res, '/projectTrends')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
