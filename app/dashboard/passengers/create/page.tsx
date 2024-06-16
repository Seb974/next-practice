import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Formulaire Vigipirate',
};
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Formulaire Vigipirate',
            href: '/dashboard/passengers/create',
            active: false,
          },
        ]}
      />
      <Form />
    </main>
  );
}