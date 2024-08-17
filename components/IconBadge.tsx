import React from "react";
import { IconType } from "react-icons/lib";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface IconBadgeType {
  Icon: IconType;
  text: string;
  iconColor: string;
}

const IconBadge = ({ Icon, text, iconColor = "" }: IconBadgeType) => {
  return (
    <Badge className="bg-dark-400 border-dark-700">
      <div className="flex items-center gap-2">
        <Icon className={cn("size-5", iconColor)} />
        <p className="text-base font-mono ">{text}</p>
      </div>
    </Badge>
  );
};

export default IconBadge;
