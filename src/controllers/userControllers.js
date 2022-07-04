import db from "../db.js"
import joi from 'joi'
import { ObjectId } from "mongodb"

export async function registersGet(req,res){
    try{
    const {name}=res.locals
    const registros=await db.collection("registros").find({name}).toArray()
    let total=0
    registros.map((e)=>{
        if(e.type==='entry'){
            total+=Number(e.price.replace(",","."))
        }
        if(e.type==='withdraw'){
            total-=Number(e.price.replace(",","."))
        }
    })
    res.send({entradas:registros,total:total.toFixed(2)})
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}

export async function registersPost(req,res){
    try{
        const schemaRegister=joi.object({
            price:joi.number().required(),
            description:joi.string().required(),
            date:joi.string().required(),
            type:joi.string().valid("entry","withdraw").required()
        })
        const validation=schemaRegister.validate(req.body)
        if(validation.error) return res.sendStatus(422)
        const {name}=res.locals
        const {price,description,date,type}=req.body
        await db.collection("registros").insertOne({name,price,description,date,type})
        res.sendStatus(201)
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}

export async function registersDelete(req,res){
    try{
        const {id}=req.headers
        const newId=id.replace('ObjectId("','').replace('")','')
        await db.collection("registros").deleteOne({_id:new ObjectId(newId)})
        res.sendStatus(200)
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}