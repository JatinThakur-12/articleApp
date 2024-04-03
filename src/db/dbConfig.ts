import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.DATABASE_URL!);

        const connection = mongoose.connection;
        
        connection.on('connected',()=>{
            console.log("Connected to mongodb");
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error please make sure db is up and running:');
            console.log(err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong while connecting to db");
        console.log(error);
    }
}