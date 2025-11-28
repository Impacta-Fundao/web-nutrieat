import { AdmById } from "@/models/admin/types/admin-props-model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useProfileModel() {
  const [admin, setAdmin] = useState<AdmById>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  async function getId() {
    const id = localStorage.getItem("id_admin");

    try {
      if (!id) throw new Error(`Id não encontrado`);
      const resp = await fetch(`/api/adms/getId?id=${String(id)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(`${data.message || resp.status}`);
      console.log(data.data);
      setAdmin(data.data);
    } catch (error) {
      const err = error as Error;
      console.error("Erro na requisição: ", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getId();
  }, []);

  return { admin, router, loading };
}
