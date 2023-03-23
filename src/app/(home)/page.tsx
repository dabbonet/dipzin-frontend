import Stream from "@/components/Stream";
import { usePlatform } from "@/lib/platforms";

// async function getStream() {
//   const res = await fetch("http://localhost:3000/api/stream");
//   if (!res.ok) throw new Error("Failed to fetch stream");
//   return res.json();
// }

export default async function Home() {
  // const stream = await getStream();
  // console.log(stream.data);

  let items = [
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
    'https://dipzinapplications.s3.us-west-1.amazonaws.com/1b5b42e1_a486_49c1_9b62_9bc3f65eedc6_474b93490f.png',
  ];

  return (
    <Stream data={items} />
  );
}