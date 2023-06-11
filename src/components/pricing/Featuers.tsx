import React from "react";
import Image from "next/image";
type Props = {
  feature: string;
};

const Featuers = ({ feature }: Props) => {
  return (
    <div className=" flex gap-2 font-medium lg:text-lg md:text-base text-sm">
      <Image
        width={16}
        height={12}
        src="/images/assets/check.svg"
        alt="check"
        unoptimized
      />
      <p>{feature}</p>
    </div>
  );
};

export default Featuers;
