import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// every page after dashboard route will be protected :/
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req)=>{
  
  const authObject = await auth();
    if (isProtectedRoute(req)) {
        if (!authObject.userId) {
            authObject.redirectToSignIn();
            return;
        }
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};