import React from "react";

const AuthForm = ({ error, isRegistering, handleSubmit, toggleMode }) => (
  <div className="bg-black/80 p-8 rounded-xl w-full max-w-md mx-auto mt-20">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white mb-2">Correo electrónico</label>
        <input
          type="email"
          name="email" // ✅ Añadido atributo name
          required
          className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Contraseña</label>
        <input
          type="password"
          name="password" // ✅ Añadido atributo name
          required
          className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-amber-400 text-black py-2 rounded font-bold hover:bg-amber-500 transition-colors"
      >
        {isRegistering ? 'Registrar Administrador' : 'Ingresar'}
      </button>
    </form>

    <button
      onClick={toggleMode}
      className="text-amber-400 hover:text-amber-500 w-full text-center mt-4"
    >
      {isRegistering ? '¿Ya tienes cuenta? Ingresa aquí' : ''}
    </button>
  </div>
);

export default AuthForm;

