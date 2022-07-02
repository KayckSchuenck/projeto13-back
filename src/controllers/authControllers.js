import joi from 'joi'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import db from "../db.js"

export async function sign_up(req,res) {
    try{
        const schemaUsuarios=joi.object({
            name:joi.string().required(),
            email:joi.string().required(),
            password:joi.string().required(),
            confirmPassword:joi.string().required()
        })
        const validation=schemaUsuarios.validate(req.body)
        if(validation.error){
            res.sendStatus(422)
            return
        }
        const {name,email,password,confirmPassword}=req.body
        const checkUser=await db.collection("usuarios").findOne({email})
        if(checkUser||confirmPassword!==password){
            res.status(409).send("Usuario já cadastrado ou senha conflitante")
            return
        }
        const hashPassword=bcrypt.hashSync(password, 10);
        await db.collection("usuarios").insertOne({name,email,hashPassword})
        res.sendStatus(201)
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}

export async function login(req,res) {
    try{
        const {email,password}=req.body
        const user=await db.collection("usuarios").findOne({email})
        if(user && bcrypt.compareSync(password, user.hashPassword)){
            const token = uuid()
            await db.collection("sessoes").insertOne({token,userId: user._id})
            res.send({name:user.name,token,userId:user._id})
        } else{
            res.sendStatus(401)
            return
        }
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
}