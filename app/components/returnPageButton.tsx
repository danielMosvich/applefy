import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReturnPageButton({
  slider,
  title,
}: {
  title?: string;
  slider?: boolean;
}) {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return slider ? (
    <div
      className={`p-2 transition-all duration-300 fixed top-0 left-0 z-40 w-full h-12 flex items-center ${
        scrollY > 350 && "bg-white/80 backdrop-blur-xl"
      }`}
      onClick={handleClick}
    >
      <button
        className={
          scrollY > 350
            ? `text-rose-500 absolute`
            : `text-white bg-black/30 rounded-full transition-all duration-300 absolute`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
          />
        </svg>
      </button>
      {scrollY > 350 && title && (
        <h2 className="font-semibold m-auto">
          {title}
        </h2>
      )}
    </div>
  ) : (
    <div
      className="fixed top-0 left-0 text-rose-500 z-40 bg-white/80 backdrop-blur-xl w-full h-12 flex items-center"
      onClick={handleClick}
    >
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
          />
        </svg>
      </button>
    </div>
  );
}
