'use client'

import { useActionState, useEffect, useRef } from "react";
import { addPersonal } from "@/lib/actions";
import { Personal } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

type PersonalClientProps = {
  initialPersonal: Personal[];
};

export default function PersonalClient({ initialPersonal }: PersonalClientProps) {
  const [state, formAction] = useActionState(addPersonal, { message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && state.message.startsWith('Éxito')) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Añadir Nuevo Personal Operativo</h2>
        <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" name="nombre" id="nombre" required className="input-field"/>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Opcional)</label>
            <input type="email" name="email" id="email" className="input-field"/>
          </div>
          <div className="md:col-span-1">
            <SubmitButton className="btn-primary">
              Añadir Personal
            </SubmitButton>
          </div>
        </form>
        {state?.message && <p className={`mt-4 text-sm ${state.message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{state.message}</p>}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {initialPersonal.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email ?? 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.rol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.es_activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.es_activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}