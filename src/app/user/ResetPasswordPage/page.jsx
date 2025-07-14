import dynamic from "next/dynamic";
import { Suspense } from "react";

const ResetPasswordClient = dynamic(() => import("../../components/ResetPasswordComponent"), {
  ssr: false, // disable SSR
});

export const dynamic = "force-dynamic"; // disables static generation

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Reset Page...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
