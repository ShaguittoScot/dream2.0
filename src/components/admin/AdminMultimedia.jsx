// src/components/admin/AdminMultimedia.jsx
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  addDoc  // <-- ¡Importación única!
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { subirImagenACloudinary } from '../../utils/cloudinary';
import InputFile from '../InputFile';


const AdminMultimedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener toda la multimedia
  useEffect(() => {
    const fetchMedia = async () => {
      const querySnapshot = await getDocs(collection(db, 'multimedia'));
      setMedia(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchMedia();
  }, []);

  // Subir nueva imagen
  const handleSubirImagen = async (file) => {
    try {
      const url = await subirImagenACloudinary(file);
      await addDoc(collection(db, 'multimedia'), {
        tipo: 'imagen',
        url,
        fechaSubida: new Date().toISOString()
      });
      fetchMedia(); // Actualizar lista
    } catch (error) {
      console.error('Error subiendo imagen:', error);
    }
  };

  // Eliminar elemento
  const handleEliminar = async (id) => {
    await deleteDoc(doc(db, 'multimedia', id));
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Gestión de Multimedia</h1>
      
      <div className="upload-section">
        <InputFile 
          label="Subir nueva imagen" 
          onFileSelect={handleSubirImagen}
          accept="image/*"
        />
      </div>

      {loading ? (
        <p>Cargando multimedia...</p>
      ) : (
        <div className="media-grid">
          {media.map(item => (
            <div key={item.id} className="media-card">
              {item.tipo === 'imagen' ? (
                <img src={item.url} alt="Media content" />
              ) : (
                <video controls>
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
              <div className="media-actions">
                <button 
                  onClick={() => handleEliminar(item.id)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMultimedia;
