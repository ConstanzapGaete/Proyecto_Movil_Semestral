import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class BasededatosService {
  private db = getFirestore();
  path: string = '';
  email: any;

  constructor() {}

  async agregarDocumento(path: string, data: any) {
    try {
      const docRef = await addDoc(collection(this.db, path), data);
      return docRef.id;
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

  async obtenerAlumnosDeAsignatura(): Promise<any> {
    this.path = `Alumnos/alumno`;
    const alumnosRef = doc(this.db, this.path);

    try {
      const docSnapshot = await getDoc(alumnosRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log('Datos de alumnos:', data);

        return data;
      } else {
        console.log('No existe este documento');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      throw error;
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
      const alumnos = await this.obtenerAlumnosDeAsignatura();

      if (alumnos) {
        Object.keys(alumnos).forEach((key) => {
          this.email = alumnos[key][0];
          console.log(this.email);
          claseData.estudiantes.push({
            correo: this.email,
            nombre: '',
            estado: 'Ausente',
            fecha: new Date(),
            hora: hora,
            ubicacionalumno: '',
          });
        });
      }

      const docId = await this.agregarDocumento(
        claseData.asignatura,
        claseData
      );
      console.log('Clase registrada con éxito');
      return docId;
    } catch (error) {
      console.error('Error al registrar la clase:', error);
      throw error;
    }
  }

  async registrarAsistencia(
    asignatura: string,
    docId: string,
    alumnoEmail: string,
    nombre: string,
    ubicacionalumno: string,
    hora: string,
    estado: string
  ) {
    try {
      this.path = asignatura + '/' + docId;
      const docRef = doc(this.db, `${this.path}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const claseData = docSnap.data();
        const estudiantes = claseData?.['estudiantes'] || [];

        const estudianteIndex = estudiantes.findIndex(
          (estudiante: any) => estudiante.correo === alumnoEmail
        );

        if (estudianteIndex !== -1) {
          estudiantes[estudianteIndex].estado = estado;
          estudiantes[estudianteIndex].ubicacionalumno = ubicacionalumno;
          estudiantes[estudianteIndex].hora = hora;
          estudiantes[estudianteIndex].asignatura = asignatura;
          estudiantes[estudianteIndex].nombre = nombre;

          await setDoc(docRef, { estudiantes }, { merge: true });
          console.log('Asistencia registrada con éxito');
        } else {
          console.log('Alumno no encontrado');
        }
      } else {
        console.log('Clase no encontrada');
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      throw error;
    }
  }

  async obtenerFechasAusenciasPorAsignatura(
    asignatura: string,
    emailAlumno: string
  ): Promise<string[]> {
    const fechasAusencias: string[] = [];

    try {
      const asignaturaRef = collection(this.db, asignatura);
      const querySnapshot = await getDocs(asignaturaRef);

      querySnapshot.docs.forEach((doc) => {
        const claseData = doc.data();
        const estudiantes = claseData['estudiantes'] || [];

        const estudianteEncontrado = estudiantes.find(
          (estudiante: any) =>
            estudiante.correo === emailAlumno && estudiante.estado === 'Ausente'
        );

        if (estudianteEncontrado) {
          fechasAusencias.push(claseData['fecha']);
        }
      });

      console.log(
        `Fechas de ausencias para ${emailAlumno} en ${asignatura}:`,
        fechasAusencias
      );
      return fechasAusencias;
    } catch (error) {
      console.error(
        `Error al obtener las fechas de ausencias para ${asignatura}:`,
        error
      );
      throw error;
    }
  }

  async existeClaseConFecha(
    asignatura: string,
    fecha: string
  ): Promise<boolean> {
    const asignaturaRef = collection(this.db, asignatura);
    const snapshot = await getDocs(asignaturaRef);

    let existe = false;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data['fecha'] === fecha) {
        existe = true;
      }
    });

    return existe;
  }

  async fechasclasesestudiante(
    asignatura: string,
    emailAlumno: string
  ): Promise<string[]> {
    const fechaclasespresente: string[] = [];

    try {
      const asignaturaRef = collection(this.db, asignatura);
      const querySnapshot = await getDocs(asignaturaRef);

      querySnapshot.docs.forEach((doc) => {
        const claseData = doc.data();
        const estudiantes = claseData['estudiantes'] || [];

        const estudianteEncontrado = estudiantes.find(
          (estudiante: any) =>
            estudiante.correo === emailAlumno &&
            estudiante.estado === 'Presente'
        );

        if (estudianteEncontrado) {
          fechaclasespresente.push(claseData['fecha']);
        }
      });

      console.log(
        `Fechas de clases registradas para ${emailAlumno}:`,
        fechaclasespresente
      );

      return fechaclasespresente;
    } catch (error) {
      console.error(`Error al obtener las fechas para ${asignatura}:`, error);
      throw error;
    }
  }
}
