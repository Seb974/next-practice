import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPassengerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Modifier un passager',
};
 
export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const passenger = await fetchPassengerById(id);

    if (!passenger) {
        notFound();
      }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Passagers', href: '/dashboard/passengers' },
            {
                label: 'Modifier un passager',
                href: `/dashboard/passengers/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form passenger={passenger} />
        </main>
    );
}