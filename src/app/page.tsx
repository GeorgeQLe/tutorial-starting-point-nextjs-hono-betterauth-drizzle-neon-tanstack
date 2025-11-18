import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { getSession, redirectToLogin } from "@/auth";

import { LandingPageContents } from "./_ui/landing-page-contents";

const LandingPage = async () => {
  const session = await getSession();

  if(session) redirectToLogin("/");

  return (
    <ErrorBoundary fallback={<div>There was an error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPageContents/>
      </Suspense>
    </ErrorBoundary>
  );
};

export default LandingPage;