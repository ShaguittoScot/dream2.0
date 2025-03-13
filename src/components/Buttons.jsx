import React, { useRef } from 'react';

// Componente buttonLeft
const ButtonLeft = ({ scrollRef }) => {
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollLeft}
      className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 rounded-full hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF" />
      </svg>
    </button>
  );
};

// Componente buttonRight
const ButtonRight = ({ scrollRef }) => {
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollRight}
      className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm border-2 border-orange-200/20 text-orange-100 rounded-full hover:bg-white/20 hover:border-orange-200/40 transition-all duration-300"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.8205 3.26875C8.2111 2.87823 8.8442 2.87823 9.2348 3.26875L15.8792 9.91322C17.0505 11.0845 17.0508 12.9833 15.88 14.155L9.3097 20.7304C8.9192 21.121 8.286 21.121 7.8955 20.7304C7.505 20.3399 7.505 19.7067 7.8955 19.3162L14.4675 12.7442C14.8581 12.3536 14.8581 11.7205 14.4675 11.33L7.8205 4.68297C7.43 4.29244 7.43 3.65928 7.8205 3.26875Z" fill="#FFFFFF" />
      </svg>
    </button>
  );
};


export { ButtonLeft, ButtonRight };
