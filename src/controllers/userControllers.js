import db from "../db.js"
import joi from 'joi'

export async function registersGet(req,res){
    try{
    const name=res.locals.name
    const registros=await db.collection("registros").find({name})
    if(!registros) return res.send(false)
    res.send(registros.toArray())
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}

export async function registersPost(req,res){
    try{
        const schemaRegister=joi.object({
            price:joi.string().required(),
            description:joi.string().required(),
            type:joi.string().valid("entry","withdraw").required()
        })
        const validation=schemaRegister.validate(req.body)
        if(validation.error) return res.sendStatus(422)
        const name=res.locals.name
        const {price,description,date,type}=req.body
        await db.collection("registros").insertOne({name,price,description,date,type})
        res.sendStatus(201)
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}