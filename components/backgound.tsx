import Image from "next/image";

function Background() {
  return (
    <div
      className="w-full h-full z-0 absolute top-0 left-0 overflow-hidden pe-none"
      style={{
        background:
          "transparent url('images/assets/noise-transparent.png') repeat 0 0",
        opacity: 0.12,
      }}
    >
      <img
        className="absolute bg-cover mb-5"
        style={{ top: "-50vh", left: "20vw" }}
        src="/images/assets/lines.svg"
        alt={""}
      />
      <img
        className="absolute top-0 -left-56 overflow-hidden opacity-75"
        style={{ width: "2000%", height: "100vh" }}
        src="/images/assets/blur.svg"
        alt={""}
      />
    </div>
  );
}

export default Background;
