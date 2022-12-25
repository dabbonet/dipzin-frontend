import Image from "next/image";


function Background() {
    return (
        <div className="overflow-hidden ">
            <img
                className="absolute bg-cover mb-5"
                style={{ top: '-50vh', left: '20vw' }}
                src="/images/assets/lines.svg"
                alt={""}
            />
            <img
                className="absolute top-56 -left-56 bg-cover"
                style={{ width: '2000%', height: '50vh' }}
                src="/images/assets/blur.svg"
                alt={""}
            />
        </div>
    );
}

export default Background;