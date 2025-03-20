import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const usePartidos = (user) => {
  const [partidos, setPartidos] = useState([]);
  const [nuevoPartido, setNuevoPartido] = useState({ equipo1: '', equipo2: '', fecha: '' });

  useEffect(() => {
    const fetchPartidos = async () => {
      if (user) {
        const snapshot = await getDocs(collection(db, 'partidos'));
        setPartidos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchPartidos();
  }, [user]);

  const agregarPartido = async (e) => {
    e.preventDefault();
    if (nuevoPartido.equipo1 && nuevoPartido.equipo2 && nuevoPartido.fecha) {
      await addDoc(collection(db, 'partidos'), nuevoPartido);
      setNuevoPartido({ equipo1: '', equipo2: '', fecha: '' });
    }
  };

  const eliminarPartido = async (id) => {
    await deleteDoc(doc(db, 'partidos', id));
  };

  return { partidos, nuevoPartido, setNuevoPartido, agregarPartido, eliminarPartido };
};
