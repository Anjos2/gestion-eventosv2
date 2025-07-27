import { getPersonal } from "@/lib/actions";
import PersonalClient from "./PersonalClient";

export default async function PersonalPage() {
  const personal = await getPersonal();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Personal</h1>
      <PersonalClient initialPersonal={personal} />
    </div>
  );
}