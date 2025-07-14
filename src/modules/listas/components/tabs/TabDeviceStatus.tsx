"use client"

import { DollarSign, CreditCard, HardDrive, Scissors, Cpu, Printer, MemoryStick, Globe } from "lucide-react"
import type { Quiosque } from "../../types"
import DeviceDetailCard from "./DeviceDetailCard"

interface TabDeviceStatusProps {
  quiosque: Quiosque
}

export default function TabDeviceStatus({ quiosque }: TabDeviceStatusProps) {
  const { statusDispositivo } = quiosque

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DeviceDetailCard device={statusDispositivo.aceitadorMoedas} icon={DollarSign} />
      <DeviceDetailCard device={statusDispositivo.validadorBillet} icon={CreditCard} />
      <DeviceDetailCard device={statusDispositivo.funil} icon={HardDrive} />
      <DeviceDetailCard device={statusDispositivo.cortador} icon={Scissors} />
      <DeviceDetailCard device={statusDispositivo.controladorDispositivo} icon={Cpu} />
      <DeviceDetailCard device={statusDispositivo.impressoraDnp} icon={Printer} />
      <DeviceDetailCard device={statusDispositivo.monitorMemoria} icon={MemoryStick} />
      <DeviceDetailCard device={statusDispositivo.leitorCartaoBancario} icon={CreditCard} />
      <DeviceDetailCard device={statusDispositivo.navegador} icon={Globe} />
    </div>
  )
}
