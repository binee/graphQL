import mongoose from "mongoose";

class Database {
    constructor(){
        this._connect()
    }

_connect() {
    mongoose.connect(`mongodb+srv://root:root123456@atlascluster.amgizqd.mongodb.net/gql?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('Database connected Succesfully')
    })
    .catch(err => {
        console.error(`${err} Database connection Error`)
    })
}
}
module.exports = new Database()