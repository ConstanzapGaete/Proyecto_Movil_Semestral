import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class BasededatosService {
  private db = getFirestore();

  constructor() {}

  async agregarDocumento(path: string, data: any) {
    try {
      const docRef = await addDoc(collection(this.db, path), data);
      console.log('Documento agregado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al agregar documento: ', error);
    }
  }

  async establecerDocumento(path: string, data: any) {
    try {
      const docRef = doc(this.db, path);
      await setDoc(docRef, data);
      console.log('Documento establecido en la ruta: ', path);
    } catch (error) {
      console.error('Error al establecer documento: ', error);
    }
  }
}
