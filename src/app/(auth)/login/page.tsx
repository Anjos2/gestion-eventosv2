import { signIn } from "@/lib/actions";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h1>
        <form action={signIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input id="email" name="email" type="email" required className="input-field"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input id="password" name="password" type="password" required className="input-field"/>
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
        <div className="text-center text-sm text-gray-600">
            <p>¿No tienes una cuenta?{' '}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Regístrate aquí
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}