"use client";
import ClientesView from "./view";
import useClienteModel from "./viewModel";
import { columns } from "./components/columns/columns";

export default function ClientesPage() {
  const { user, error, fetchData, loading } = useClienteModel();
  return (
    <ClientesView
      loading={loading}
      columns={columns}
      user={user}
      error={error}
      fetchData={fetchData}
    />
  );
}
