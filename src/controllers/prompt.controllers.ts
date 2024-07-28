import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {
	GenerateCaptionFromIdeaBody,
	GeneratePostIdeaBody,
	GeneratePromptBody,
	SaveCaptionRequestBody,
} from '~/models/prompt.model';
import HTTP_STATUS from "~/constants/http-status";
import {
	fetchIdeasWithCaptions,
	generateCaptions,
	generateCaptionsFromIdea,
	generatePostIdeas,
	saveGeneratedCaptions, saveIdea, unsaveCaptions,
} from '~/services/content-generator.services';

export const generatePostCaptionController = async (
	req: Request<ParamsDictionary, any, GeneratePromptBody>,
	res: Response
) => {
	return res.status(HTTP_STATUS.OK).json({
		data: await generateCaptions(req.body)
	});
}

export const generatePostIdeaController = async (
	req: Request<ParamsDictionary, any, GeneratePostIdeaBody>,
	res: Response
) => {
	return res.status(HTTP_STATUS.OK).json({
		data: await generatePostIdeas(req.body)
	})
}
export const saveGeneratedCaptionsController = async (
	req: Request<ParamsDictionary, any, SaveCaptionRequestBody>,
	res: Response) => {
		const { idea, captions } = req.body;

		// Save the idea and get its ID
	const ideaId = await saveIdea(idea);



	// Save the captions with the ideaId
	const result = await saveGeneratedCaptions({ ideaId, captions });
	return res.status(HTTP_STATUS.OK).json({
		data: result,
	});
}

export const getIdeasWithCaptionsController = async (
	req: Request,
	res: Response
) => {
	return res.status(HTTP_STATUS.OK).json({
		data: await fetchIdeasWithCaptions()
	})
}

export const unsaveCaptionsController = async (
	req: Request<ParamsDictionary>,
	res: Response
) => {
	const { captionId, ideaId } = req.params;
return res.status(HTTP_STATUS.OK).json({
		data: await unsaveCaptions(captionId, ideaId)
	})
}

export const generateCaptionsFromIdeaController = async (
	req: Request<ParamsDictionary, any, GenerateCaptionFromIdeaBody>,
	res: Response
) => {
	return res.status(HTTP_STATUS.OK).json({
		data: await generateCaptionsFromIdea(req.body)
	})
}
