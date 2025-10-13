import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-white text-white focus:border-white/90'
                    : 'border-transparent text-white/80 hover:border-white/80 hover:text-white focus:border-white/90 focus:text-white') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
