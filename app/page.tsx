import { Suspense } from "react";
import Home from "./(main)/home";
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
