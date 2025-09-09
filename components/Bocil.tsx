import React from "react";
import Image from "next/image";
function ProblemFix() {
  return (
    <div className="flex justify-center align-item-center mr-20">
      <Image
        className="object-contain"
        width={1280}
        height={590}
        src="/problem fix.png"
        alt="Banner"
      />
    </div>
  );
}

export default ProblemFix;
