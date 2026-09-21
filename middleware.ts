export { auth as middleware } from "@/auth";

// Protege todo el portal salvo: las rutas de Auth.js, la pantalla de login,
// los estáticos de Next y el logo.
export const config = {
  matcher: [
    "/((?!api/auth|login|_next/static|_next/image|favicon.ico|trei-logo.png).*)",
  ],
};
