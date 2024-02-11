import Link from 'next/link';
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import styles from '@/css/sidebar.module.css';

const menuList = {
  authenticated: [
    { title: 'Ordenes', href: '/orders', Icon: IoTicketOutline },
    { title: 'Salir', href: '', Icon: IoLogOutOutline },
  ],
  login: [{ title: 'Ingresar', href: '/auth/login', Icon: IoLogInOutline }],
  admin: [
    { title: 'Productos', href: '/admin/products', Icon: IoShirtOutline },
    { title: 'Ordenes', href: '/admin/orders', Icon: IoTicketOutline },
    { title: 'Usuarios', href: '/admin/users', Icon: IoPeopleOutline },
  ],
};

interface Props {
  closeMenu: () => void;
  logout?: () => Promise<void>;
  type: keyof typeof menuList;
}

export const ListItems = ({ closeMenu, type, logout }: Props) =>
  menuList[type].map(({ title, href, Icon }, index) =>
    title === 'Salir' ? (
      <button
        onClick={async () => logout && (await logout())}
        className={styles.item}
        key={`${href}-${index}`}
      >
        <Icon size={25} />
        <span className="ml-3 text-xl">{title}</span>
      </button>
    ) : (
      <Link
        href={href}
        onClick={closeMenu}
        className={styles.item}
        key={`${href}-${index}`}
      >
        <Icon size={30} />
        <span className="ml-3 text-xl">{title}</span>
      </Link>
    ),
  );
