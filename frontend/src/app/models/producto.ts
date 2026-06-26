// Define la estructura de un Producto en TypeScript
// Sirve para tipar los datos que vienen del backend
export interface Producto {
  id?: number;      // Opcional (?) porque al crear no existe aún
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}