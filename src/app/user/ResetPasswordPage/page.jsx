import { Suspense } from "react";
import dynamic from "next/dynamic";

const ResetPasswordPage = dynamic(() => import("../../components/ResetPasswordComponent"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
