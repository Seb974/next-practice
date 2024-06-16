import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '../lib/actions';

export default function LogoutForm() {
    return (
        <form action={logout} className="space-y-3">
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
            <div className="hidden md:block">Déconnexion</div>
          </button>
        </form>
    );
}