import * as React from "react";
export function Banner() {
  return (
    <section className="w-full mt-20 bg-black">
      <img
        src="/banner.png"
        alt="Company Banner"
        className="
          w-full 
          h-auto 
          object-contain 
          lg:object-cover
        "
      />
    </section>
  );
}
