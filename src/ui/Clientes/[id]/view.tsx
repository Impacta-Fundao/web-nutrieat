"use client";
import Loading from "@/components/ui/animation/loading";
import usePreviewUser from "./viewModel";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Error from "@/components/ui/animation/error-animation";

interface UserPreviewView {
  params: { id: string };
}

export default function PreviewView({ params }: UserPreviewView) {
  const { data, error, loading } = usePreviewUser(params);
  const route = useRouter();

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <div className="flex justify-center mt-[10%] text-5xl">Status - {error}</div>
        <Error />
      </>
    );

  return (
    <main className="h-screen min-h-screen py-8 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Detalhes do Usuário
          </h1>
          <p className="mt-2 text-gray-600">Informações completas do cliente</p>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          <div className="bg-[#48cfad] px-6 py-4">
            <div className="flex items-center justify-between ">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {data?.data.nome}
                </h2>
                <p className="text-white">{data?.data.sala}</p>
              </div>
              <div className="rounded-full bg-[#37bc9b] px-3 py-1">
                <span className="font-medium text-white">
                  ID: {data?.data.id}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="gap-6">
              <div className="space-y-4">
                <h3 className="border-b pb-2 mr-2 text-lg font-semibold text-gray-900">
                  Informações Pessoais
                </h3>
                <p>Email: {data?.data.email}</p>
                <p>CPF: {data?.data.cpf}</p>
                <p>Sala: {data?.data.sala}</p>
                <Button
                  onClick={() => route.back()}
                  className="w-full bg-[#48cfad] hover:bg-[#37bc9b]"
                  children="Voltar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
