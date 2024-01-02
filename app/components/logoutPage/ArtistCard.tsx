import { usePalette } from "color-thief-react";
import { useRouter } from "next/navigation";

type ArtistCardProps = {
  name: string;
  id?: string;
  img: string;
};
export default function ArtistCard({ name, id, img }: ArtistCardProps) {
  const { push } = useRouter();
  const { data, loading, error } = usePalette(img, 5, "hex", {
    crossOrigin: "https://i.scdn.co/",
  });
  return (
    <div
      style={{
        background: `url(${img})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[300px] flex items-end rounded-xl overflow-hidden shadow-xl"
    >
      <div
        style={{ background: data ? String(data[0]) : "rgb(0,0,0)" }}
        className="text-white w-full p-3 flex gap-3 justify-between"
      >
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-lg">escucha ahora!</p>
        </div>
        <button
          className="flex text-white items-center justify-center"
          onClick={() => {
            push(`/artist/${id}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
