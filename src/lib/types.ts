export type Personal = {
  id: number;
  nombre: string;
  email: string | null;
  rol: 'ADMINISTRATIVO' | 'OPERATIVO';
  es_activo: boolean;
};

export type Contratador = {
  id: number;
  tipo_documento: 'DNI' | 'RUC' | 'Pasaporte';
  numero_documento: string;
  nombre: string;
  es_activo: boolean;
};

export type TipoContrato = {
  id: number;
  nombre: string;
  ingreso_base: number;
  es_activo: boolean;
};

export type Servicio = {
  id: number;
  nombre: string;
  monto_base: number;
  es_activo: boolean;
};