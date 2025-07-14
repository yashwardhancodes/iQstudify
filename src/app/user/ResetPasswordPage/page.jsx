import { Suspense } from "react";
import ResetPasswordClient from '../../components/ResetPasswordComponent';

export const dynamic = "force-dynamic"; // disables static generation

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
