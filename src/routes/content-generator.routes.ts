import { Router } from 'express';
import { wrapRequestHandler } from '~/utils/handlers';
import {
	generateCaptionsFromIdeaValidator,
	generatePostCaptionValidator,
	generatePostIdeaValidator
} from "~/middlewares/prompt.middlewares";
import {
	generateCaptionsFromIdeaController,
	generatePostCaptionController,
	generatePostIdeaController,
	getIdeasWithCaptionsController,
	saveGeneratedCaptionsController,
	unsaveCaptionsController,
} from '~/controllers/prompt.controllers';
import {
	fetchCaptionsByIdea,
	fetchIdeasWithCaptions,
	fetchIndividualCaptions, saveGeneratedCaptions,
} from '~/services/content-generator.services';

const contentGeneratorRoutes = Router();

contentGeneratorRoutes.post('/captions', generatePostCaptionValidator, wrapRequestHandler(generatePostCaptionController));
contentGeneratorRoutes.post('/ideas', generatePostIdeaValidator, wrapRequestHandler(generatePostIdeaController));
contentGeneratorRoutes.post('/captions-from-idea', generateCaptionsFromIdeaValidator, wrapRequestHandler(generateCaptionsFromIdeaController));

contentGeneratorRoutes.post('/save', wrapRequestHandler(saveGeneratedCaptionsController));
contentGeneratorRoutes.get('/captionsByIdeas', wrapRequestHandler(getIdeasWithCaptionsController));
contentGeneratorRoutes.get('/captionsWithoutIdea', wrapRequestHandler(getIdeasWithCaptionsController));
contentGeneratorRoutes.delete('/unsave/idea/:ideaId/caption/:captionId', wrapRequestHandler(unsaveCaptionsController));
export default contentGeneratorRoutes;
