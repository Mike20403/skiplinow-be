import { Router } from 'express';
import { checkAccessCodeController, generateAccessCodeController } from '~/controllers/users.controllers';
import { checkCodeValidator, generateCodeValidator } from '~/middlewares/user.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';

const usersRoute = Router();

usersRoute.post('/generate', generateCodeValidator, wrapRequestHandler(generateAccessCodeController));

usersRoute.post('/check', checkCodeValidator, wrapRequestHandler(checkAccessCodeController));

export default usersRoute;
