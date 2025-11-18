import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

import { getSession, redirectToLogin } from "@/auth";

import { HomePageContents } from "./_ui/home-page-contents";

const HomePage = async () => {
  const session = await getSession();

  if(!session) redirectToLogin("/home");

  return (
    <ErrorBoundary fallback={<div>There was an error</div>}>
    <Suspense fallback={<div>Loading...</div>}>
        <HomePageContents/>
    </Suspense>
    </ErrorBoundary>
  );
};

export default HomePage;