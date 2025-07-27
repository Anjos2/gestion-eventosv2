'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// --- ACCIONES DE AUTENTICACIÓN ---

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=No se pudo autenticar al usuario.')
  }
  return redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  const orgName = formData.get('org_name') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        org_name: orgName,
        full_name: fullName
      }
    }
  });

  if (error) {
    console.error('Sign up error:', error);
    return redirect('/signup?message=No se pudo registrar al usuario.');
  }
  return redirect('/login?message=Registro exitoso. Por favor, inicia sesión.');
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

// --- ACCIONES DE GESTIÓN DE PERSONAL ---

export async function getPersonal() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('Personal').select('*');
  if (error) {
    console.error('Error fetching personal:', error)
    return []
  }
  return data
}

export async function addPersonal(
  prevState: { message: string },
  formData: FormData
) {
  try {
    const p_nombre = formData.get('nombre') as string;
    const p_email = formData.get('email') as string;

    const supabase = await createClient();

    const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');

    if (orgIdError || !orgId) {
      throw new Error("No se pudo determinar la organización del usuario desde su sesión.");
    }

    const { error: insertError } = await supabase.from('Personal').insert({
        nombre: p_nombre,
        email: p_email || null,
        rol: 'OPERATIVO',
        id_organizacion: orgId
    });

    if (insertError) {
      throw insertError;
    }

    revalidatePath('/dashboard/personal');
    return { message: 'Éxito: El nuevo miembro del personal ha sido añadido.' };

  } catch (error: any) {
    console.error("--- ERROR DETALLADO EN addPersonal ---", error); 
    return { message: `Error al crear el registro de personal: ${error.message}` };
  }
}


// --- ACCIONES DE GESTIÓN DE CATÁLOGOS ---

export async function getCatalogos() {
    const supabase = await createClient();

    const [contratadoresRes, tiposContratoRes, serviciosRes] = await Promise.all([
        supabase.from('Contratadores').select('*'),
        supabase.from('Tipos_Contrato').select('*'),
        supabase.from('Servicios').select('*')
    ]);

    return {
        contratadores: contratadoresRes.data ?? [],
        tiposContrato: tiposContratoRes.data ?? [],
        servicios: serviciosRes.data ?? [],
    };
}

export async function addContratador( prevState: { message: string }, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');
    if (orgIdError || !orgId) throw new Error("No se pudo determinar la organización del usuario.");

    const { error } = await supabase.from('Contratadores').insert({
      id_organizacion: orgId,
      tipo_documento: formData.get('tipo_documento') as string,
      numero_documento: formData.get('numero_documento') as string,
      nombre: formData.get('nombre') as string,
    });
    if (error) throw error;
    revalidatePath('/dashboard/catalogos');
    return { message: 'Éxito: Contratador añadido.' };
  } catch (e: any) {
    return { message: `Error: ${e.message}` };
  }
}

export async function addTipoContrato( prevState: { message: string }, formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');
        if (orgIdError || !orgId) throw new Error("No se pudo determinar la organización del usuario.");

        const { error } = await supabase.from('Tipos_Contrato').insert({
            id_organizacion: orgId,
            nombre: formData.get('nombre') as string,
            ingreso_base: Number(formData.get('ingreso_base')),
        });
        if (error) throw error;
        revalidatePath('/dashboard/catalogos');
        return { message: 'Éxito: Tipo de contrato añadido.' };
    } catch (e: any) {
        return { message: `Error: ${e.message}` };
    }
}

export async function addServicio( prevState: { message: string }, formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: orgId, error: orgIdError } = await supabase.rpc('get_my_org_id');
        if (orgIdError || !orgId) throw new Error("No se pudo determinar la organización del usuario.");

        const { error } = await supabase.from('Servicios').insert({
            id_organizacion: orgId,
            nombre: formData.get('nombre') as string,
            monto_base: Number(formData.get('monto_base')),
        });
        if (error) throw error;
        revalidatePath('/dashboard/catalogos');
        return { message: 'Éxito: Servicio añadido.' };
    } catch (e: any) {
        return { message: `Error: ${e.message}` };
    }
}