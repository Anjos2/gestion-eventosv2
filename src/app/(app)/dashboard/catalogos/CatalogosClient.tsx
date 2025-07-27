'use client'

import { useActionState } from "react";
import { addContratador, addTipoContrato, addServicio } from "@/lib/actions";
import { Contratador, TipoContrato, Servicio } from "@/lib/types";
import { SubmitButton } from "@/components/SubmitButton";

type CatalogosClientProps = {
  contratadores: Contratador[];
  tiposContrato: TipoContrato[];
  servicios: Servicio[];
};

export default function CatalogosClient({ contratadores, tiposContrato, servicios }: CatalogosClientProps) {
  const [contratadorState, contratadorAction] = useActionState(addContratador, { message: '' });
  const [tipoContratoState, tipoContratoAction] = useActionState(addTipoContrato, { message: '' });
  const [servicioState, servicioAction] = useActionState(addServicio, { message: '' });

  return (
    <div className="space-y-12">
      {/* SECCIÓN DE CONTRATADORES */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contratadores (Clientes)</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form action={contratadorAction} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="nombre_contratador" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" name="nombre" id="nombre_contratador" required className="input-field"/>
            </div>
            <div>
              <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700">Tipo Doc.</label>
              <select name="tipo_documento" id="tipo_documento" required className="input-field">
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
             <div>
              <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700">Número Doc.</label>
              <input type="text" name="numero_documento" id="numero_documento" required className="input-field"/>
            </div>
            <SubmitButton className="btn-primary">Añadir Contratador</SubmitButton>
          </form>
          {contratadorState?.message && <p className="mt-2 text-sm text-gray-600">{contratadorState.message}</p>}
        </div>
      </section>

      {/* SECCIÓN DE TIPOS DE CONTRATO */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tipos de Contrato</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form action={tipoContratoAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="nombre_tipo_contrato" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" name="nombre" id="nombre_tipo_contrato" required className="input-field" />
            </div>
            <div>
              <label htmlFor="ingreso_base" className="block text-sm font-medium text-gray-700">Ingreso Base (S/.)</label>
              <input type="number" name="ingreso_base" id="ingreso_base" required step="0.01" className="input-field" />
            </div>
            <SubmitButton className="btn-primary">Añadir Tipo</SubmitButton>
          </form>
          {tipoContratoState?.message && <p className="mt-2 text-sm text-gray-600">{tipoContratoState.message}</p>}
        </div>
      </section>
      
      {/* SECCIÓN DE SERVICIOS */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Servicios</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {/* LA CORRECCIÓN ESTÁ EN LA SIGUIENTE LÍNEA */}
          <form action={servicioAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
             <div className="md:col-span-1">
              <label htmlFor="nombre_servicio" className="block text-sm font-medium text-gray-700">Nombre del Servicio</label>
              <input type="text" name="nombre" id="nombre_servicio" required className="input-field" />
            </div>
            <div>
              <label htmlFor="monto_base" className="block text-sm font-medium text-gray-700">Monto Base (S/.)</label>
              <input type="number" name="monto_base" id="monto_base" required step="0.01" className="input-field" />
            </div>
            <SubmitButton className="btn-primary">Añadir Servicio</SubmitButton>
          </form>
          {servicioState?.message && <p className="mt-2 text-sm text-gray-600">{servicioState.message}</p>}
        </div>
      </section>
    </div>
  );
}