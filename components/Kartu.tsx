import React from "react";
import { LucideProps } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface KartuProps {
  icon: React.ComponentType<LucideProps> | null;
  title: string;
  description?: string;
  bgColor?: string;
  iColor?: string;
}

function Kartu({
  icon: Icon,
  title,
  description,
  bgColor = "#35B5C3",
  iColor = "#fff",
}: KartuProps) {
  return (
    <Card
      className="
        w-full
        max-w-[600px]     /* 🔒 desktop aman */
        border-none
        shadow-none
      "
    >
      {/* ICON */}
      <CardContent className="flex justify-center">
        <div
          className="
            rounded-3xl
            p-3
            flex
            items-center
            justify-center
          "
          style={{ backgroundColor: bgColor }}
        >
          {Icon && (
            <Icon
              color={iColor}
              className="
                w-10 h-10        /* 📱 HP */
                md:w-12 md:h-12  /* 📲 Tablet */
                lg:w-14 lg:h-14  /* 🖥 Desktop */
              "
            />
          )}
        </div>
      </CardContent>

      {/* TEXT */}
      <CardFooter className="flex flex-col text-center gap-3">
        <p
          className="
            font-bold
            text-[20px]
            md:text-[25px]
            lg:text-[24px]
          "
        >
          {title}
        </p>

        {description && (
          <p
            className="
              text-[15px]
              md:text-[20px]
              lg:text-[20px]
              px-4
              leading-relaxed
            "
          >
            {description}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

export default Kartu;
