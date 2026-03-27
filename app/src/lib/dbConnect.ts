import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number,
}

const connection: ConnectionObject = {}

async function dbConnect (): Promise<void> {
    // check if the database is already connected or not
    if(connection.isConnected) {
        console.log('connected to db');
        return;
    }

    try {
       const db = await mongoose.connect(process.env.MONGODB_URI || '')
       console.log('db connections', db.connections)
       connection.isConnected = db.connections[0].readyState
       console.log("connected to db sucessfully");
       
    } catch (error) { 
        console.log('err in connecting database', error)
        process.exit(1)
    }
}

export default dbConnect;