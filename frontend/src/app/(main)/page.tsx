import MainSection from "./components/MainSection";
import PostSection from "./components/PostSection";

export default function Main() {
  return (
    <main className="mt-20 grid grid-cols-[5fr_2fr] gap-x-20">
      <MainSection />
      <PostSection />
    </main>
  );
}
