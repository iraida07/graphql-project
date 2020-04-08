'use strict'

//se colocan los resolvers para los tipos

const connectDb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    Malware: {
        info_provider: async ( { info_provider } ) =>{
            let db
            let ids
            let providerData

            try{
                db = await connectDb()
                ids = info_provider ? info_provider.map(id => ObjectID(id)) : []
                providerData = ids.length > 0 
                    ? await db.collection('Companies').find(
                        { _id: { $in: ids} }
                    ).toArray()
                    : []

            }catch(error){
                console.error(error)
            }

            return providerData
        }
    }
}