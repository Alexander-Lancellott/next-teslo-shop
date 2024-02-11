export const dynamic = 'force-dynamic';

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

import { getOrdersByUser } from '@/actions';
import { Pagination, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {
    ok,
    orders = [],
    totalPages = 1,
  } = await getOrdersByUser({ page, take: 11 });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-[calc(100svh-105px)]">
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-neutral">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium"
              >
                #ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-neutral bg-background-start transition duration-300 ease-in-out
                  hover:bg-secondary"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  {order.id.split('-').at(-1)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center whitespace-nowrap px-6 py-4 text-sm font-light">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="px-6 text-sm font-light">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
