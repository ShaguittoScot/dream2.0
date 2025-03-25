import React, { useState } from "react";

const InputFile = ({ label, onChange, preview, aspectRatio }) => {
  return (
    <div className="mt-6">
      <label className="block text-xl text-white font-semibold mb-2">{label}</label>
      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-full max-w-[300px] bg-gray-800 border-4 border-dashed border-blue-500 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative"
          style={{ aspectRatio }}
          onClick={() => document.getElementById(`fileInput-${label}`).click()}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt={`Previsualización ${label}`}
                className="w-full h-full object-cover object-center rounded-lg"
              />
              <div className="absolute inset-0 bg-[#23878e]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </>
          ) : (
            <span className="text-gray-400 text-center text-sm">Subir imagen</span>
          )}
        </div>
        <input
          id={`fileInput-${label}`}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
        <button
          onClick={() => document.getElementById(`fileInput-${label}`).click()}
          className="file:bg-blue-500 file:text-white file:py-2 file:px-6 file:rounded-lg file:border-0 file:cursor-pointer hover:file:bg-blue-400 transition bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400"
        >
          Seleccionar archivo
        </button>
      </div>
    </div>
  );
};

export default InputFile;