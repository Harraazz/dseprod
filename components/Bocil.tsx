import React from "react";
import Image from "next/image";
function ProblemFix() {
  return (
    <div className="flex justify-center items-center w-full px-4 md:px-10">
      <Image
        className="object-contain max-w-full h-auto"
        width={1280}
        height={590}
        src="/problem fix.png"
        alt="Banner"
      />
    </div>
  );
}

export default ProblemFix;
