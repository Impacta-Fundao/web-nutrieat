import { ClientesViewProps } from "@/models/clientes/types/clientes-props-model";
import { DataTable } from "./components/DataTable/dataTable";
import Loading from "@/components/ui/animation/loading";

export default function ClientesView({
  user,
  columns,
  loading,
  deleteClient
}: ClientesViewProps & { deleteClient: (id: string) => Promise<any>}) {

  return loading ? <Loading /> : <DataTable columns={columns} data={user} meta={{deleteClient}} />;
}
