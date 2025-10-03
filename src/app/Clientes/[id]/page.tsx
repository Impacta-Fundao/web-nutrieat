import PreviewUserPage from "@/ui/Clientes/[id]";


export default async function Preview(props: {params: Promise<{id: string}>}) {
  return <PreviewUserPage params={props.params}/>;
}
