import { Router } from 'express';
import { checkAccessCodeController, generateAccessCodeController } from '~/controllers/users.controllers';
import { checkCodeValidator, generateCodeValidator } from '~/middlewares/user.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';

const usersRouter = Router();

usersRouter.post('/generate', generateCodeValidator, wrapRequestHandler(generateAccessCodeController));

usersRouter.post('/check', checkCodeValidator, wrapRequestHandler(checkAccessCodeController));

export default usersRouter;
