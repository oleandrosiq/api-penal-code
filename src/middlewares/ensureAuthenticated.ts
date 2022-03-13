import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

interface payload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ error: 'Token invalid!' });
  }

  try {
    const { sub } = verify(token, String(process.env.APP_SECRET_KEY)) as payload;

    const user = await UserRepository.findById(sub);

    if (!user) {
      return response.status(401).json({ error: 'User not found!' });
    }

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token expired!' });
  }
}
