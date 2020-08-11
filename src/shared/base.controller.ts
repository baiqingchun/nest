import { SECRET } from '../config';
import * as jwt from 'jsonwebtoken';

export class BaseController {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {

  }

  protected getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, SECRET);
    return decoded.id;
  }
}
