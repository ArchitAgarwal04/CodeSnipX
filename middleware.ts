import { authMiddleware } from "@clerk/nextjs/server"; // Import from @clerk/nextjs/server

// Protect routes with authentication, allowing specified public routes
export default authMiddleware({
  publicRoutes: ["/","/api/webhooks/clerk"],
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
