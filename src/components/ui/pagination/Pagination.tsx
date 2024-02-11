'use client';

import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`; //   href="/kid";
    }

    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mb-24 mt-10 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex items-center">
          <li className="page-item">
            <Link
              className={clsx(
                `page-link relative block rounded border-0 bg-transparent px-3 py-1.5
                  outline-none transition-all duration-300 hover:bg-neutral focus:shadow-none`,
                {
                  'pointer-events-none opacity-10': currentPage === 1,
                },
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={27} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={page} className="page-item">
              <Link
                className={clsx(
                  `page-link relative block rounded border-0 px-3 py-1.5 outline-none
                    transition-all duration-300 hover:bg-neutral focus:shadow-none`,
                  {
                    'pointer-events-none bg-primary text-primary-content shadow-sm hover:bg-primary':
                      page === currentPage,
                  },
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className={clsx(
                `page-link relative block rounded border-0 bg-transparent px-3 py-1.5
                  outline-none transition-all duration-300 hover:bg-neutral focus:shadow-none`,
                {
                  'pointer-events-none opacity-10': currentPage === totalPages,
                },
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={27} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
