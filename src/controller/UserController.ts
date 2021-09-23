import { Request, Response } from 'express';
import '../config/env';
import * as bcrypt from 'bcrypt';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { User } from '../Models/User';

let request = (url, method, data) => {
  return axios({ url, method, data });
};

class UserController {  

async create(req: Request, res: Response){
    try {
      const data: { id; name; email; password; } = req.body;
      data.id = uuidv4();      
      const passwordHash = await bcrypt.hash(data.password, 8);
      data.password = passwordHash;    
      const response = await request("http://localhost:3004/user", "post", data); 
      return res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getUsers(req: Request, res: Response){
    try {        
      const response = await request("http://localhost:3004/user", "get", null);    
      
      return res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new UserController();
