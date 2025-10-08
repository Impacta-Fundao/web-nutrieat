import { ClientesViewProps } from "@/models/clientes/types/clientes-props-model";
import { DataTable } from "./components/DataTable/dataTable";
import Loading from "@/components/ui/animation/loading";

export default function ClientesView({
  user,
  columns,
  loading,
}: ClientesViewProps) {

  return loading ? <Loading /> : <DataTable columns={columns} data={user} />;
}
