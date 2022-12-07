import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.config()


const connectDB = async () => {
    try {
        const dbUrl = process.env.DB_URL
        const con = await mongoose.connect(dbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

export default connectDB
