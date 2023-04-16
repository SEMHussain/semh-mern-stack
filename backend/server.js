const express = require('express')
const path = require('path');
const dotenv = require('dotenv').config()
const routerPage = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')
const Color = require('colors');
const cors = require('cors')

const port = process.env.PORT || 5000



connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())


// app.use('/api/goals' , require('./routes/goalRoutes'))
app.use('/api/goals' , routerPage);
app.use('/api/user' , userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  }

app.use(errorHandler)



app.listen(port , ()=>{
    console.log('Server Start PORT : ' + port)
})