import { signUp } from "@/lib/actions";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Crear Nueva Cuenta y Organización</h1>
        <form action={signUp} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Tu Nombre Completo</label>
            <input id="full_name" name="full_name" type="text" required className="input-field"/>
          </div>
          <div>
            <label htmlFor="org_name" className="block text-sm font-medium text-gray-700">Nombre de tu Organización</label>
            <input id="org_name" name="org_name" type="text" required className="input-field"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input id="email" name="email" type="email" required className="input-field"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input id="password" name="password" type="password" required className="input-field"/>
          </div>
          <button type="submit" className="btn-primary">Registrarse</button>
        </form>
         <div className="text-center text-sm text-gray-600">
            <p>¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}