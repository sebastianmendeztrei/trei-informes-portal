# Portal de Informes — Trei

Portal-selector (Next.js + Auth.js) que gatea con **Microsoft Entra ID** el acceso
a los tres informes financieros de Trei y deja elegir a cuál entrar:

- **Control de Deuda** → `https://debt-control-rouge.vercel.app/`
- **Cobranza** → `https://debt-control-rouge.vercel.app/cobranza`
- **Tesorería** → `https://debt-control-rouge.vercel.app/tesoreria/posicion-caja`

Se sirve en `https://trei-informes.app`.

## Cómo entra la gente

1. Va a `trei-informes.app` → login con Microsoft (Entra ID).
2. Solo los correos de la lista pueden entrar (ver `auth.ts` → `DEFAULT_ALLOW`, o
   la variable `ALLOWED_EMAILS`). Hoy: `smendez@trei.cl`, `pelgueta@trei.cl`,
   `finanzas@trei.cl`, `nicole.jaramillo@ivcb.cl`.
3. Cae en el selector y elige el informe. (Cada módulo mantiene por ahora su
   propio login; unificarlos bajo Entra es el paso siguiente.)

Reutiliza la **misma app de Entra** del informe comercial (`trei-informe-auth`):
no se crea una app nueva. La regla de correos de este portal es independiente de
la del comercial.

## Despliegue (proyecto Vercel `trei-informes-app-redirect`)

1. **Conectar este repo** al proyecto de Vercel `trei-informes-app-redirect`
   (Settings → Git → Connect). Framework: Next.js (autodetectado).
2. **Variables de entorno** (Settings → Environment Variables), ver `.env.example`:
   - `AUTH_SECRET` — nuevo (`openssl rand -base64 32`).
   - `AUTH_MICROSOFT_ENTRA_ID_ID` = `ENTRA_CLIENT_ID` del worker.
   - `AUTH_MICROSOFT_ENTRA_ID_SECRET` = `ENTRA_CLIENT_SECRET` del worker.
   - `AUTH_MICROSOFT_ENTRA_ID_ISSUER` = `https://login.microsoftonline.com/<TENANT_ID>/v2.0`.
   - `AUTH_TRUST_HOST` = `true`.
3. **Azure** (Entra → App registrations → la app existente → Authentication →
   Redirect URIs) agregar, sin quitar las del comercial:
   `https://trei-informes.app/api/auth/callback/microsoft-entra-id`
4. Deploy. Verificar el dominio `trei-informes.app` apuntando a este proyecto.

## Local

```bash
npm install
cp .env.example .env.local   # completar valores
npm run dev
```
