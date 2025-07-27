import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Mi Empresa
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/dashboard/personal" className="block px-4 py-2 rounded hover:bg-gray-700">
            Personal
          </Link>
          <Link href="/dashboard/catalogos" className="block px-4 py-2 rounded hover:bg-gray-700">
            Catálogos
          </Link>
        </nav>
        <div className="p-2 border-t border-gray-700">
            <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
}