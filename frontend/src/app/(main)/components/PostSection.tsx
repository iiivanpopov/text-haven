import Post from "@components/Post";

const date = new Date();

const date1 = new Date(date.setHours(10));
const date2 = new Date(date.setHours(5));
const date3 = new Date(date.setHours(2));

export default function PostSection() {
  return (
    <>
      <Post
        id="a"
        title="Sample code"
        content={Array.from({ length: 100 }, () => "H").join("")}
        date={date1}
      />
      <Post
        id="b"
        title="Meeting notes"
        content={Array.from({ length: 30 }, () => "H").join("")}
        date={date2}
      />
      <Post
        id="2"
        title="Favorite quote"
        content={
          "Hello a sdsad sadas dsa sadsa sasadas dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld dsa sadsa as asdas asdworld\n\ttest"
        }
        date={date3}
      />
    </>
  );
}
