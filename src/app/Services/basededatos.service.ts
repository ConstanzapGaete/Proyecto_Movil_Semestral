import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BasededatosService {
  private db = getFirestore();

  constructor() {}

  async agregarDocumento(path: string, data: any) {
    try {
      const docRef = await addDoc(collection(this.db, path), data);
      return docRef.id;
      console.log('Documento agregado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al agregar documento: ', error);
      return null;
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

  async registrarClase(
    asignatura: string,
    codigo: string,
    dia: string,
    fecha: string,
    hora: string,
    profesor: string,
    ubicacionprofesor: string
  ): Promise<string> {
    const claseData = {
      asignatura,
      codigo,
      dia,
      fecha,
      hora,
      profesor,
      ubicacionprofesor,
      estudiantes: [],
    };

    try {
      const docId = await this.agregarDocumento(`clases`, claseData);
      console.log('Clase registrada con éxito');
      return docId;
    } catch (error) {
      console.error('Error al registrar la clase:', error);
      throw error;
    }
  }

  async registrarAsistencia(
    docId: string,
    alumnoEmail: string,
    ubicacionalumno: string,
    hora: string,
    estado: string
  ) {
    try {
      const docRef = doc(this.db, `clases/${docId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const claseData = docSnap.data();
        const estudiantes = claseData?.['estudiantes'] || [];

        estudiantes.push({
          email: alumnoEmail,
          fecha: new Date(),
          hora,
          estado,
          ubicacionalumno,
        });

        await setDoc(docRef, { estudiantes }, { merge: true });
        console.log('Asistencia registrada con éxito');
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      throw error;
    }
  }
}
