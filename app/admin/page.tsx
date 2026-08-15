import { cookies } from "next/headers";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/adminAuth";

export const metadata = {
  title: "Admin | Lucy Chivers",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const authed = await verifyAdminSessionToken(token);

  return authed ? <AdminDashboard /> : <AdminLogin />;
}
