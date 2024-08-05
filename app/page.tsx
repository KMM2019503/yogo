import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className="text-red-500">Hello</h1>
      <Button variant={"outline"}> Click Me</Button>
    </main>
  );
}
