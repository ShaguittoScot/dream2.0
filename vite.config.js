import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Esto asegura que Vite escuche en todas las interfaces de red
    port: process.env.PORT || 5174, // Utiliza el puerto proporcionado por Render o 5173 por defecto
    allowedHosts: [
        'dream2-0-1.onrender.com', // Agrega la URL de tu app de Render aquí
      ],
  },
});
