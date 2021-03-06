import db from '../db.js'

export async function validateRegister(req,res,next){
    const {authorization}=req.headers
    const token = authorization?.replace("Bearer ", "").trim()
    if(!token) return res.status(401).send("Token inválido, faça login novamente")

    try{
        const session = await db.collection("sessoes").findOne({ token })
        if (!session) return res.status(401).send("Usuário não encontrado, faça login novamente")
        const user = await db.collection("usuarios").findOne({ 
            _id: session.userId
        })
        if(!user) return res.status(404).send("Usuário não encontrado, faça seu cadastro")
        res.locals.name = user.name
        next()
    } catch(e){
        res.status(500).send("Erro com o servidor")
    }
   
}