import { Suspense } from "react";
import ResetPage from "@/app/components/resetPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetPage />
    </Suspense>
  );
}
