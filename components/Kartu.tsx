import React from "react";
import { LucideProps } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface KartuProps {
  icon: React.ComponentType<LucideProps> | null; // biar Boleh null
  title: string;
  description?: string;
  bgColor?: string;
  iColor?: string;
  iconSize?: number;
}
function Kartu({
  icon: Icon,
  title,
  description,
  bgColor = "#35B5C3",
  iColor = "#fff",
  iconSize = 89,
}: KartuProps) {
  if (!Icon) {
    return (
      <Card className="w-150">
        <CardContent className="flex justify-center">
          <div
            className="rounded-3xl p-4 flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="w-[89px] h-[89px] bg-gray-300 rounded-full flex items-center justify-center">
              <span>No Icon</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center justify-center flex-col font-regular">
          <p className="text-[24px] font-bold">{title}</p>
          <p className="text-[16px] ms-11 mr-11">{description}</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-150 outline-none border-none shadow-none">
      <CardContent className="flex justify-center ">
        <div
          className="rounded-3xl p-4 flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={iconSize} color={iColor} />
        </div>
      </CardContent>
      <CardFooter className="text-center justify-center flex-col font-regular">
        <p className="text-[24px] font-bold">{title}</p>
        <p className="text-[16px] ms-12 mr-12">{description}</p>
      </CardFooter>
    </Card>
  );
}

export default Kartu;