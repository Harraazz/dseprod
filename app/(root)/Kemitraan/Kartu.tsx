import React from "react";
import { LucideProps } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface KartuProps {
  icon: React.ComponentType<LucideProps> | null;
  title: string;
  bgColor?: string;
  iColor?: string;
  iconSize?: number;
  textSize?: string;
}

function Kartu({
  icon: Icon,
  title,
  bgColor = "#35B5C3",
  iColor = "#fff",
  iconSize = 64,
  textSize = "text-[24px]",
}: KartuProps) {
  if (!Icon) {
    return (
      <Card className="w-full max-w-[220px] mx-auto border-none shadow-none">
        <CardContent className="flex justify-center">
          <div
            className="rounded-3xl p-4 flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span>No Icon</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center justify-center flex-col font-regular">
          <p className={`font-semibold ${textSize}`}>{title}</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-200 mx-auto border-none shadow-none">
      <CardContent className="flex justify-center">
        <div
          className="rounded-3xl p-4 flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={iconSize} color={iColor} />
        </div>
      </CardContent>
      <CardFooter className="text-center justify-center flex-col font-regular">
        <p className={`font-semibold ${textSize}`}>{title}</p>
      </CardFooter>
    </Card>
  );
}

export default Kartu;
