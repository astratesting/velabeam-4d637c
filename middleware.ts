import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.url));
  }

  // Protect client portal (simplified - in production would verify client ownership)
  if (pathname.startsWith("/c/") && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.url));
  }

  // Redirect logged-in users from auth pages to dashboard
  if ((pathname === "/signin" || pathname === "/signup") && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/c/:path*", "/signin", "/signup"],
};
