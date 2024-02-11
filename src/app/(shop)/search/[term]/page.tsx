export const revalidate = 60; // 60 segundos

import { Gender } from '@prisma/client';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

interface Props {
  params: {
    term: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { term } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  let forTerm = true;

  let resp = await getPaginatedProductsWithImages({
    page,
    term,
  });

  if (resp.products.length === 0) {
    const gender = Object.values(Gender);
    const index = Math.floor(Math.random() * gender.length);

    forTerm = false;
    resp = await getPaginatedProductsWithImages({
      page: 1,
      gender: gender[index],
    });
  }

  const { products, totalPages } = resp;

  return (
    <>
      <Title title="Buscar producto" className="mb-2" />
      {forTerm ? (
        <div className="flex">
          <h3 className="mb-5 text-xl">
            Estos son los productos que coinciden con:
          </h3>
          <p className="text-xl text-primary">&nbsp;&quot;{term}&quot;</p>
        </div>
      ) : (
        <>
          <div className="flex">
            <h3 className="mb-5 text-xl">
              No encontramos productos que coinciden con:
            </h3>
            <p className="text-xl text-primary">&nbsp;&quot;{term}&quot;</p>
          </div>
          <h2 className="mb-5">Quizás estos productos puedan interesarte</h2>
        </>
      )}
      <ProductGrid products={products} />
      {forTerm && totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
