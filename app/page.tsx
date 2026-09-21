import { auth, signOut } from "@/auth";

const INFORMES = [
  {
    ctag: "Deuda Financiera",
    title: "Control de Deuda",
    desc: "Deuda del grupo consolidada: créditos vigentes, acreedores y perfil de vencimientos, con el costo promedio ponderado (WACD) y un simulador de escenarios.",
    tags: ["Créditos", "Acreedores", "Vencimientos", "Simulador"],
    href: "https://debt-control-rouge.vercel.app/",
    icon: (
      <path d="M3 21h18M4 21V10m4 11V10m4 11V10m4 11V10m4 11V10M12 3 3.5 8h17L12 3Z" />
    ),
  },
  {
    ctag: "Cartera de Clientes",
    title: "Cobranza",
    desc: "Cartera por proyecto y conciliación de ingresos en vivo: recaudación del mes, bandejas por conciliar y Transbank/TOKU — conectado al SaaS Cobranza.",
    tags: ["Por proyecto", "Conciliación", "Recaudación"],
    href: "https://debt-control-rouge.vercel.app/cobranza",
    icon: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z M9 8h6 M9 12h6" />,
  },
  {
    ctag: "Caja & Bancos",
    title: "Tesorería",
    desc: "Posición de caja consolidada por sociedad, banco y cuenta (fuente Floid), con movimientos bancarios y conciliación automática.",
    tags: ["Posición de caja", "Movimientos", "Conciliación"],
    href: "https://debt-control-rouge.vercel.app/tesoreria/posicion-caja",
    icon: <path d="M3 7h18v12H3zM3 7l3-3h12l3 3M16 13h.01" />,
  },
];

const arrow = (
  <svg viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default async function Home() {
  const session = await auth();
  const name = session?.user?.name || "";
  const email = session?.user?.email || "";

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <span className="logo-tile">
            <img src="/trei-logo.png" alt="Trei Inmobiliaria" />
          </span>
          <span className="div" />
          <span className="sub">Control de Gestión</span>
        </div>
        <div className="userbox">
          <svg className="msft" viewBox="0 0 21 21" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          <span className="who">
            {name ? <b>{name}</b> : null}
            {email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="salir" type="submit">
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="wrap">
        <p className="eyebrow">Portal de Informes</p>
        <h1>Elige un informe</h1>
        <p className="lead">
          Tres tableros del área financiera de Trei, cada uno en su propio
          espacio. Selecciona a cuál entrar.
        </p>

        <section className="grid">
          {INFORMES.map((it) => (
            <a className="card" key={it.title} href={it.href}>
              <span className="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">{it.icon}</svg>
              </span>
              <p className="ctag">{it.ctag}</p>
              <h2>{it.title}</h2>
              <p className="desc">{it.desc}</p>
              <ul className="tags">
                {it.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="cta">Entrar {arrow}</span>
            </a>
          ))}
        </section>

        <footer>
          <span className="lock" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
              <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
            </svg>
            Sesión validada con Microsoft Entra ID
          </span>
          <span className="sep">·</span>
          <span>Grupo VCB · Trei Inmobiliaria</span>
          <span className="sep">·</span>
          <span>Control de Gestión</span>
        </footer>
      </main>
    </>
  );
}
