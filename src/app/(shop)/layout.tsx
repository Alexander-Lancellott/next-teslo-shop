import { Footer, Sidebar, TopMenu } from '@/components';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      <div className="absolute">
        <Sidebar />
      </div>

      <div className="flex flex-col px-0 sm:px-10">{children}</div>

      <Footer />
    </>
  );
}
