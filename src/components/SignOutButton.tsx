import { signOut } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded">
        Cerrar Sesión
      </button>
    </form>
  );
}