import Image from "next/image";


function Background() {
    return (
        <div>
            <img
                className="absolute bg-cover mb-5 left-40 bottom-40"
                src="/images/assets/lines.svg"
                alt={""}
            />
            <Image
                className="absolute w-full h-full bg-cover"
                src="/images/assets/blur.svg"
                fill
                alt={""}
            />
        </div>
    );
}

export default Background;