import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

interface CardProps {
  Icon: IconType;
  number: number;
  title: string;
  iconColor: string;
}

const Card = ({ Icon, number, title, iconColor }: CardProps) => {
  return (
    <div className="border rounded-md p-5 bg-yogo-bgDark shadow-md shadow-dark-500">
      <div className="flex justify-start items-center gap-x-5">
        <Icon className={cn("size-8", iconColor)} />
        <p className="text-3xl font-mono font-bold">{number}</p>
      </div>
      <p className="mt-4 text-lg">{title}</p>
    </div>
  );
};

export default Card;
