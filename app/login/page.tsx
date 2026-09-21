import { signIn } from "@/auth";

export default function Login({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;
  const denied = error === "AccessDenied";

  return (
    <div className="login-shell">
      <main className="login-main">
        <div className="login-card">
          <span className="login-logo">
            <img src="/trei-logo.png" alt="Trei Inmobiliaria" />
          </span>
          <h1>Portal de Informes</h1>
          <p className="sub">Grupo VCB · Trei Inmobiliaria</p>

          {error ? (
            <div className="login-error">
              {denied
                ? "Tu cuenta no está autorizada para este portal. Si crees que debería tener acceso, escribe a Control de Gestión."
                : "No se pudo completar el inicio de sesión. Vuelve a intentarlo."}
            </div>
          ) : null}

          <form
            action={async () => {
              "use server";
              await signIn("microsoft-entra-id", { redirectTo: "/" });
            }}
          >
            <button className="btn-msft" type="submit">
              <svg viewBox="0 0 21 21" aria-hidden="true">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Entrar con Microsoft
            </button>
          </form>

          <p className="login-note">
            Entras con tu cuenta de Microsoft (la misma del correo). No hay una
            contraseña aparte que recordar.
          </p>
        </div>
      </main>
      <div className="login-foot">
        Acceso restringido · Control de Gestión — Trei Inmobiliaria
      </div>
    </div>
  );
}
