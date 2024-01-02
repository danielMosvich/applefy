import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  title: string;
  img: string;
  id:string
};


export default function Card({ title, img,id }: CardProps) {
  const {push} = useRouter()
  return (
    <div className="bg-neutral-100 shadow-sm ring-1 ring-neutral-200 flex items-center rounded-md overflow-hidden gap-2" onClick={()=>{push(`/playlist/${id}`)}}>
      <Image
        className="w-12 h-12 object-cover"
        src={img}
        alt=""
        unoptimized
        width={48}
        height={48}
      />
      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</h2>
    </div>
  );
}
