import { Request, Response } from "express";
import axios from "axios";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

let request = (url, method, data) => {
  return axios({ url, method, data });
};

class TokenController {
  
  async login(req: Request, res: Response) {
    let userPassword;
    const { email = '', password = '' } = req.body;        

    if(!email || !password) {
      return res.status(401).json({ errors: ['Credenciais inválidas'] });    }
    
      const response = await request("http://localhost:3004/user", "get", null);       
      
      response.data.forEach(element => {
        if (element.email === email) {
          userPassword = element;
          if (!userPassword) {
            return res.status(401).json({ errors: ['Usuário não existe'], 
          });          
          }
          
          if(!( bcrypt.compare(userPassword.password, password))) {
            return res.status(401).json({ errors: ['Senha inválida'], 
          });
          }   
          
          const { id } = userPassword;
          const token = jwt.sign({ id, email }, process.env.APP_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
          });
          return res.json({ token: token });
        } 
        
      });          
           
  }

}

export default new TokenController();