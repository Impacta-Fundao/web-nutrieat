
import PreviewView from "./view";

interface UserPreviewView {
    params: Promise<{id: string}>
}

export default async function PreviewUserPage(props: UserPreviewView) {
  const id = await props.params;
  return <PreviewView params={id} />;
}
