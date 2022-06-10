const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = (req , res ,next )=> {
    
    const hash = bcrypt.hashSync(req.body.password, 10);
   let user = new User ({
        displayName : req.body.displayName ,
        email : req.body.email ,
        password : hash  ,
    })
    user.save().then( user=> {res.status(201).send(user)
        res.json({
            message : 'User Added Succesfully ',
            
        })
    }
      
    ).catch(error=> {
        res.json({
            message : 'Error Occur adding user'
        })
    }
      )

}
const signin =(req ,res ,next )=> {
    const email = req.body.email ;
    const password = req.body.password ;
   User.findOne({$or:[{'email':email} ] }).then( user=> {  console.log('US'+user);
        if (user){console.log(password);
          
           bcrypt.compare(password,user.password),(err,result)=>{
           
             if(err){
                res.json({error :err})
            }
           if(result){
               
                let token = jwt.sign({name:user.displayName } ,'verySecretValue' ,{expiresIn  : '1h'})
                res.json({
                    message : 'Sign In succesfully ',
                    token :token
                    
                })
            }else { 
                res.json({
                    message : 'Password does not match'
                })
            }
        }}else {
            res.json({
                message : 'No user found'
            })
        }
    })
}




module.exports = {register ,signin} 