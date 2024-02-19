import mongoose from 'mongoose'
import app from './app'
import {Server} from 'http'
import config from './config/index'



let mainServer :Server

    async function startServer (){
        try{
            await mongoose.connect(config.database_url as string)
            app.listen(config.port, () => {
                console.log(`Example app listening on port ${config.port}`)
              })
        }
        catch(error){
            console.log(error)
        }
    }


    startServer().catch((err) => console.log(err))

process.on('unhandledRejection', () => {
  if (mainServer) {
    mainServer.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  process.exit(1)
})