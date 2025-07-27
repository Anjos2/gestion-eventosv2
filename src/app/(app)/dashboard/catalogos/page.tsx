import { getCatalogos } from "@/lib/actions";
import CatalogosClient from "./CatalogosClient";

export default async function CatalogosPage() {
  const { contratadores, tiposContrato, servicios } = await getCatalogos();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Catálogos</h1>
      <CatalogosClient 
        contratadores={contratadores}
        tiposContrato={tiposContrato}
        servicios={servicios}
      />
    </div>
  );
}