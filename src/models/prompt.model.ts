export interface GeneratePromptBody {
	social: string
	subject: string
	tone: string
}

export interface GeneratePostIdeaBody {
	topic: string
}

export interface GenerateCaptionFromIdeaBody {
	idea: string
}

export interface SaveCaptionRequestBody {
	idea: string
	ideaId?: string
	captions: string[]
}

export interface SaveCaptionByIdeaIdBody {
	ideaId?: string
	captions: string[]
}

export interface UnsaveCaptionRequestBody {
	ideaId: string
	captionId: string
}

export interface CaptionPayloadResponse {
	captionId: string
	caption:string
}
export interface IdeaWithCaptions {
	ideaId: string;
	idea: string;
	captions: CaptionPayloadResponse[];
}