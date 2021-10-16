const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const userRoutes = require('./routes/user')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/api', userRoutes)
  .get('/', (req, res) => res.render('pages/index'))

  
  .use((req, res, next) => { res.status(404).json({
      title: '404 - Page Not Found', 
      Help: '<Help & Documentation Url>',
      path: req.url,
    })
  })

  .use((error, req, res, next) => { res.status(500).json({
        message: "An Error Occurred. Please see the help link below.",
        Help: '<Help & Documentation Url>',
        url: req.url,
        error: error
      })
    })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
