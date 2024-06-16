'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { signOut } from '@/auth';
import { AuthError } from 'next-auth';
 
const FormSchema = z.object({
  id: z.number(),
  lastname: z.string({
    invalid_type_error: 'Entrez votre nom de famille s\'il vous plaît.',
  }),
  name: z.string({
    invalid_type_error: 'Entrez votre prénom s\'il vous plaît.',
  }),
  email: z.string({
    invalid_type_error: 'Entrez votre adresse email s\'il vous plaît.',
  }),
  phone: z.string({
    invalid_type_error: 'Entrez votre numéro de téléphone s\'il vous plaît.',
  }),
  date: z.date(),
});

export type State = {
    errors?: {
      lastname?: string[];
      name?: string[];
      email?: string[];
      phone?: string[];
    };
    message?: string | null;
  }
 
const CreatePassenger = FormSchema.omit({ id: true, date: true });
const UpdatePassenger = FormSchema.omit({ id: true, date: true });

export async function createPassenger(prevState: State, formData: FormData) {

    const validatedFields = CreatePassenger.safeParse({
        lastname: formData.get('lastname'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Des informations sont manquantes. La création du passager n\'a pas pu aboutir.',
        };
    }

    const { lastname, name, email, phone } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO passengers (lastname, name, email, phone, date)
            VALUES (${lastname}, ${name}, ${email}, ${phone}, ${date})
        `;
    } catch (error) {
        return { message: 'Erreur: La création du passager n\'a pas pu aboutir.'};
    }

    revalidatePath('/dashboard/passengers');
    redirect('/dashboard/passengers', RedirectType.replace);
}

export async function updatePassenger(id: string, prevState: State, formData: FormData) {

  const validatedFields = UpdatePassenger.safeParse({
        lastname: formData.get('lastname'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
  });

  if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Des informations sont manquantes. La modification du passager n\'a pas pu aboutir.',
      };
  }
   
  const { lastname, name, email, phone } = validatedFields.data;
   
  try {
      await sql`
      UPDATE passengers
      SET lastname = ${lastname}, name = ${name}, email = ${email}, phone = ${phone}
      WHERE id = ${id}
      `;
  } catch (error) {
      return { message: 'Erreur : la mise à jour du passager n\'a pas pu aboutir.'};
  }
  
  revalidatePath('/dashboard/passengers');
  redirect('/dashboard/passengers');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM passengers WHERE id = ${id}`;
        revalidatePath('/dashboard/passengers');
        return { message: 'Passager supprimé.' };
    } catch (error) {
        return { message: 'Erreur : la suppression du passager n\'a pas pu aboutir.'};
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'L\'adresse email et le mot de passe ne correspondent pas.';
        default:
          return 'Une erreur est survenue.';
      }
    }
    throw error;
  }
}

export async function logout() {
  return await signOut();
};