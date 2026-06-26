// Define la estructura de un Cliente en TypeScript
export interface Cliente {
  id?: number;      // Opcional (?) porque al crear no existe aún
  tipo: string;     // Natural o Jurídico
  nombres: string;
  documento: string;
  telefono: string;
  correo: string;
  estado: boolean;  // Activo o Inactivo
}