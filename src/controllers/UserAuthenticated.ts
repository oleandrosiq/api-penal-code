import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import UserRepository from '../repositories/UserRepository';

class UserAuthenticated {
  async index(request: Request, response: Response) {
    const { username, password } = request.body;
    
    if (!username) {
      return response.status(400).json({ error: 'Username is required' });
    }

    if (!password) {
      return response.status(400).json({ error: 'Password is required' });
    }

    const user = await UserRepository.findByUsername(username);

    if (!user) {
      return response.status(400).json({ error: 'User not found.' });
    }

    const math = await compare(password, user.password);

    if (!math) {
      return response.status(400).json({ error: 'Invalid username or password.' });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = sign(payload, String(process.env.APP_SECRET_KEY), {
      subject: user.id,
      expiresIn: 10 * 24 * 60 * 60,
    });

    return response.json({ user: { id: user.id, username: user.username, }, token });
  }
}

export default new UserAuthenticated();
