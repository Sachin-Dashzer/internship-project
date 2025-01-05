
import dbConnection from "./db/index.js";
import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config('.env')

const PORT = process.env.PORT || 8000;


dbConnection()
    .then((db) => {

        app.get('/' , (req , res)=>{
            res.send("everything fine")
        })

        app.listen(PORT , () => {
            console.log(`Server is running on port ${PORT}`);
        });

    }).catch((err) => {
        console.log(err);
    });