import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '~/constants/firebase-config';
import User from '~/models/users.model';
import { v4 as uuidv4 } from 'uuid';

class UsersService {
	private collectionName = 'user';

	public async addOrUpdateUser(user: User): Promise<void> {
		try {
			const userId = user.id || uuidv4();
			const userRef = doc(firestore, this.collectionName, userId);
			await setDoc(
				userRef,
				{
					phoneNumber: user.phoneNumber,
					expiresAt: user.expiresAt,
					accessCode: user.accessCode,
				},
				{ merge: true },
			);
			console.log('User added or updated successfully');
		} catch (error) {
			console.error('Error adding or updating user: ', error);
			throw new Error('Error adding or updating user');
		}
	}

	public async getUser(userId: string): Promise<User | undefined> {
		try {
			const userRef = doc(firestore, this.collectionName, userId);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				return userDoc.data() as User;
			} else {
				return undefined;
			}
		} catch (error) {
			return undefined;
		}
	}
}

const usersService = new UsersService();
export default usersService;
