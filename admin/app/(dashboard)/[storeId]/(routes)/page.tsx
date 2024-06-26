import db from "@/lib/database";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const store = await db.store.findFirst({ where: { id: params.storeId } });

  return <div className="p-8">Active store: {store?.name}</div>;
};

export default DashboardPage;
