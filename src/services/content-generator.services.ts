import {
	GenerateCaptionFromIdeaBody,
	GeneratePostIdeaBody,
	GeneratePromptBody, IdeaWithCaptions, SaveCaptionByIdeaIdBody,
} from '~/models/prompt.model';
import gemini from "~/constants/gemini";
import { firestore } from '~/constants/firebase-config';
import { doc, collection, addDoc, getDocs, serverTimestamp, query, where, deleteDoc } from 'firebase/firestore';

const _getGenerateCaptionPrompt = (social: string, subject: string, tone: string) => {
	return `give me answer only. the answer should be in json format (array of captions as string) and don't include external characters. generate 5 captions for social media ${social} on the subject ${subject} with tone ${tone}`;
}

const _getGeneratePostIdeaPrompt = (topic: string) => {
	return `give me answer only. the answer should be in json format (array of ideas as string) and don't include external characters. generate 5 post ideas for topic ${topic}`;
}

const _getGenerateCaptionsFromIdeaPrompt = (idea: string) => {
	return `give me answer only. the answer should be in json format (array of captions as string) and don't include external characters. generate 5 captions for idea ${idea}`;
}

export const generateCaptions = async (params: GeneratePromptBody) => {
	const prompt = _getGenerateCaptionPrompt(params.social, params.subject, params.tone);
	const content = await gemini.generateContent(prompt);
	return JSON.parse(content.response.text());
}

export const generatePostIdeas = async (params: GeneratePostIdeaBody) => {
	const prompt = _getGeneratePostIdeaPrompt(params.topic);
	const content = await gemini.generateContent(prompt);
	return JSON.parse(content.response.text());
}

export const generateCaptionsFromIdea = async (params: GenerateCaptionFromIdeaBody) => {
	const prompt = _getGenerateCaptionsFromIdeaPrompt(params.idea);
	const content = await gemini.generateContent(prompt);
	return JSON.parse(content.response.text());
}

export const saveIdea = async (idea?: string): Promise<string | undefined > => {
	if (!idea) {
		return undefined;
	}
	const ideasRef = collection(firestore, 'ideas');
	// Check if the idea already exists
	const ideasQuery = query(ideasRef, where('idea', '==', idea));
	const ideasSnapshot = await getDocs(ideasQuery);

	if (!ideasSnapshot.empty) {
		// If the idea exists, return its ID
		const existingIdea = ideasSnapshot.docs[0];
		return existingIdea.id;
	}

	// If the idea doesn't exist, create a new one
	const ideaDoc = await addDoc(ideasRef, { idea });
	return ideaDoc.id;
};

export const saveGeneratedCaptions = async (params: SaveCaptionByIdeaIdBody) => {
	const { ideaId = '', captions } = params;

	const captionsRef = collection(firestore, 'captions');

	const savePromises = captions.map((caption) => {
		return addDoc(captionsRef, {
			ideaId,
			caption,
		});
	});

	await Promise.all(savePromises);

	return {
		ideaId,
		captions,
	};
};

export const fetchCaptionsByIdea = async (ideaId: string) => {
	const captionsRef = collection(firestore, 'captions');
	const q = query(captionsRef, where('ideaId', '==', ideaId));
	const querySnapshot = await getDocs(q);

	const captions = querySnapshot.docs.map(doc => doc.data());

	return captions;
};

export const fetchIndividualCaptions = async () => {
	const captionsRef = collection(firestore, 'captions');
	const q = query(captionsRef, where('ideaId', '==', null));
	const querySnapshot = await getDocs(q);

	const captions = querySnapshot.docs.map(doc => doc.data());

	return captions;
};

export const fetchIdeasWithCaptions = async (): Promise<IdeaWithCaptions[]> => {
	const ideasRef = collection(firestore, 'ideas');
	const ideasSnapshot = await getDocs(ideasRef);

	const ideasWithCaptions: IdeaWithCaptions[] = [];

	const fetchCaptionsPromises = ideasSnapshot.docs.map(async (ideaDoc) => {
		const ideaData = ideaDoc.data();
		const ideaId = ideaDoc.id;

		const captionsRef = collection(firestore, 'captions');
		const captionsQuery = query(captionsRef, where('ideaId', '==', ideaId));
		const captionsSnapshot = await getDocs(captionsQuery);

		const captions = captionsSnapshot.docs.map((captionDoc) => {
			return {
				captionId: captionDoc.id,
				caption: captionDoc.data().caption
			}
		});

		ideasWithCaptions.push({
			ideaId,
			idea: ideaData.idea,
			captions,
		});
	});

	await Promise.all(fetchCaptionsPromises);

	return ideasWithCaptions;
};

export const unsaveCaptions = async (captionId:string,ideaId: string) => {
// 	delete the caption and delete the idea if it has no more captions
	const captionRef = doc(firestore, 'captions', captionId);
	await deleteDoc(captionRef);

	const captionsRef = collection(firestore, 'captions');
	const q = query(captionsRef, where('ideaId', '==', ideaId));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		const ideaRef = doc(firestore, 'ideas', ideaId);
		await deleteDoc(ideaRef);
	}

	return {
		success: true
	};
}