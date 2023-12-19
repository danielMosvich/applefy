export default function LoginPage() {
  return (
    <div>
      <h2 className="font-bold text-3xl">Escuchar</h2>
      <a
        // href="http://localhost:3001/login"
        href="https://applefy-back.onrender.com/login"
        className="p-5 rounded-2xl mt-4 h-96 shadow-xl flex flex-col justify-center items-center"
        style={{
          background: "url('./loginImage.svg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h3 className="text-4xl tracking-normal font-bold text-white text-center">
          Iniciar Sesion
        </h3>
        <div className="flex gap-3 items-center">
          <p className="flex items-center text-lg font-semibold text-white/90">
            <span>Click to redirect</span>
          </p>
          <button className="bg-white/90 w-6 h-6 flex justify-center items-center rounded-full text-black/70 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122z"
                />
              </g>
            </svg>
          </button>
        </div>
      </a>
    </div>
  );
}
