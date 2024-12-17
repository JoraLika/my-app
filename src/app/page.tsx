import Hello from "./components/hello";

export default function Home() {
  console.log('Hello --SERVER/CLIENT');

  return (
    <>
      <h1 className="text-3xl">Welcome to Next.js</h1>
      <Hello/>
    </>
  );
}
