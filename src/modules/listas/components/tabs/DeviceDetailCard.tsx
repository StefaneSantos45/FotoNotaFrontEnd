import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DeviceStatus } from "../../types"

interface DeviceDetailCardProps {
  device: DeviceStatus
  icon: React.ElementType
}

export default function DeviceDetailCard({ device, icon: Icon }: DeviceDetailCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
          <Icon className="w-5 h-5 mr-2 text-slate-600" />
          {device.name}
          <span
            className={`ml-auto text-sm font-medium px-2 py-1 rounded-full ${
              device.status === "conectado" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {device.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {device.properties.map((prop, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-slate-600">{prop.label}:</span>
              <span className="text-slate-800">{String(prop.value)}</span>
            </div>
          ))}
          {/* Render specific properties if they exist */}
          {"moeda" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Moeda:</span>
              <span className="text-slate-800">{(device as any).moeda}</span>
            </div>
          )}
          {"debugPollCount" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">debugPollCount:</span>
              <span className="text-slate-800">{(device as any).debugPollCount}</span>
            </div>
          )}
          {"optoEstados" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Opto Estados:</span>
              <span className="text-slate-800">{(device as any).optoEstados}</span>
            </div>
          )}
          {"contagemMidia" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Contagem de Mídia:</span>
              <span className="text-slate-800">{(device as any).contagemMidia}</span>
            </div>
          )}
          {"revisaoSoftware" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Revisão de Software:</span>
              <span className="text-slate-800">{(device as any).revisaoSoftware}</span>
            </div>
          )}
          {"estaCortandoAgora" in device && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Está Cortando Agora:</span>
              <span className="text-slate-800">{(device as any).estaCortandoAgora ? "Sim" : "Não"}</span>
            </div>
          )}
        </div>
        {"codigosCaminho" in device && (device as any).codigosCaminho.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-2">Códigos de Caminho:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {(device as any).codigosCaminho.map((item: { code: string; moeda: string }, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-slate-600">{item.code}:</span>
                  <span className="text-slate-800">{item.moeda}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {"memoriaDetalhes" in device && (device as any).memoriaDetalhes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-2">Detalhes da Memória:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {(device as any).memoriaDetalhes.map(
                (item: { name: string; used: string; total: string }, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-slate-600">{item.name}:</span>
                    <span className="text-slate-800">
                      {item.used} / {item.total}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">RSS:</span>
                <span className="text-slate-800">{(device as any).rss}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Heap Total:</span>
                <span className="text-slate-800">{(device as any).heapTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pilha Usada:</span>
                <span className="text-slate-800">{(device as any).pilhaUsada}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Externo:</span>
                <span className="text-slate-800">{(device as any).externo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Buffers de Array:</span>
                <span className="text-slate-800">{(device as any).buffersArray}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
