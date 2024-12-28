import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function setupAdminUser(email: string, password: string) {
  try {
    // Criar usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Criar documento do usuário no Firestore com role admin
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      success: true,
      uid: userCredential.user.uid
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
} 