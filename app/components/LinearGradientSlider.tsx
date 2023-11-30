// import React, { useState, useEffect } from 'react';

// const LinearGradientSlider = () => {
//   const [isDragging, setDragging] = useState(false);
//   const [gradientPercentage, setGradientPercentage] = useState(0);

//   const startDrag = () => {
//     setDragging(true);
//   };

//   const stopDrag = () => {
//     setDragging(false);
//   };

//   const drag = (e) => {
//     if (!isDragging) return;

//     const wrap = document.getElementById('wrap');
//     const boundingBox = wrap.getBoundingClientRect();
//     const x = e.clientX - boundingBox.left;

//     // Asegúrate de que x esté en el rango [0, wrap.offsetWidth]
//     const percentage = Math.max(0, Math.min(x / wrap.offsetWidth, 1));

//     // Actualiza los valores del gradiente lineal
//     wrap.style.background = `linear-gradient(90deg, rgb(79, 79, 79) 0%, rgb(106, 106, 106) ${percentage * 100}%, #b3bac4a2 ${percentage * 100}%, #9da2abad 100%)`;

//     // Actualiza el estado del porcentaje
//     setGradientPercentage(percentage);
//   };
//   useEffect(()=>{
//     console.log(gradientPercentage)
//   },[gradientPercentage])
//   return (
//     <div
//       id="wrap"
//       style={{
//         backgroundColor: 'red',
//         width: '500px',
//         height: '20px',
//         borderRadius: '10px',
//         overflow: 'hidden',
//         background: `linear-gradient(90deg, rgb(79, 79, 79) 0%, rgb(106, 106, 106) ${gradientPercentage * 100}%, #b3bac4a2 ${gradientPercentage * 100}%, #9da2abad 100%)`,
//         cursor: 'pointer',
//       }}
//       onMouseDown={startDrag}
//       onMouseUp={stopDrag}
//       onMouseMove={drag}
//     ></div>
//   );
// };

// export default LinearGradientSlider;
import React, { useState, useEffect, useRef } from "react";
import { usePlayerStore } from "../store/player";

type VolumeBarProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

const LinearGradientSlider: React.FC<VolumeBarProps> = ({ audioRef }) => {
  const [isDragging, setDragging] = useState(false);
  const [gradientPercentage, setGradientPercentage] = useState(0.1);
  const { volume, changeVolume } = usePlayerStore();
  const wrapRef = useRef<HTMLDivElement>(null);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    // e.preventDefault();
    setDragging(true);
  };

  const stopDrag = () => {
    setDragging(false);
  };

  const drag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const wrap = wrapRef.current;

    if (!wrap) return;

    const boundingBox = wrap.getBoundingClientRect();
    let x;

    // Verifica si es un evento táctil
    if ("touches" in e) {
      x = e.touches[0].clientX - boundingBox.left;
    } else {
      x = e.clientX - boundingBox.left;
    }

    // Asegúrate de que x esté en el rango [0, wrap.offsetWidth]
    const percentage = Number(
      Math.max(0, Math.min(x / wrap.offsetWidth, 1)).toFixed(2)
    );

    if (percentage > 0) {
      if (audioRef.current) {
        if (audioRef.current.volume) {
        //   audioRef.current.volume = volume;
          changeVolume(percentage);
          // Actualiza los valores del gradiente lineal
          wrap.style.background = `linear-gradient(90deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) ${
            percentage * 100
          }%, rgba(176, 179, 185, 0.7) ${
            percentage * 100
          }%, rgba(176, 179, 185, 0.7) 100%)`;

          setGradientPercentage(percentage);
        }
      }
    }
  };

  useEffect(() => {
    setGradientPercentage(volume);
  }, []);

  return (
    <div className="flex gap-4 items-center text-white">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.63rem"
          height="1rem"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8l134.9 119.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z"
          />
        </svg>
      </button>
      <div
        ref={wrapRef}
        style={{
          backgroundColor: "red",
          width: "80vw",
          height: "10px",
          borderRadius: "5px",
          overflow: "hidden",
          background: `linear-gradient(90deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) ${
            gradientPercentage * 100
          }%, rgba(176, 179, 185, 0.7) ${
            gradientPercentage * 100
          }%, rgba(176, 179, 185, 0.7) 100%)`,
          cursor: "pointer",
        }}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={drag}
      ></div>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.1rem"
          height="1.1rem"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8c54.2-44 88.7-111 88.7-186.2s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5c21.5 17.6 35.4 44.4 35.4 74.5s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64v384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64v-64c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
          />
        </svg>
      </button>
    </div>
  );
};

export default LinearGradientSlider;
