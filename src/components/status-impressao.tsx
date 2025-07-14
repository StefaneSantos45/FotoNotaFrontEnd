"use client"

export default function StatusImpressao() {
  const quiosques = [
    {
      id: "10199",
      nome: "Guararapes",
      impressoHoje: 0,
      impressoOntem: 0,
      sessoesHoje: 0,
      sessoesOntem: 0,
    },
    {
      id: "10201",
      nome: "Tacaruna",
      impressoHoje: 0,
      impressoOntem: 0,
      sessoesHoje: 0,
      sessoesOntem: 0,
    },
    {
      id: "10200",
      nome: "Loja Recife",
      impressoHoje: 0,
      impressoOntem: 0,
      sessoesHoje: 0,
      sessoesOntem: 0,
    },
    {
      id: "10202",
      nome: "RioMar",
      impressoHoje: 0,
      impressoOntem: 0,
      sessoesHoje: 0,
      sessoesOntem: 0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Atividade de quiosques</h1>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <h2 className="text-lg font-semibold">Atividade de Quiosques</h2>
          <p className="text-blue-100 text-sm">Status de impressões e sessões em tempo real</p>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-left text-blue-600 font-medium">ID</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Quiosque</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Impresso Hoje</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Impresso Ontem</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Sessões Hoje</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Sessões Ontem</th>
            </tr>
          </thead>
          <tbody>
            {quiosques.map((quiosque, index) => (
              <tr key={quiosque.id} className="border-t border-gray-100">
                <td className="px-6 py-4 text-gray-600">{quiosque.id}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{quiosque.nome}</td>
                <td className="px-6 py-4 text-gray-600">
                  {quiosque.impressoHoje} ({quiosque.impressoHoje})
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {quiosque.impressoOntem} ({quiosque.impressoOntem})
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {quiosque.sessoesHoje} ({quiosque.sessoesHoje})
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {quiosque.sessoesOntem} ({quiosque.sessoesOntem})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="text-sm text-pink-500">
          <span>FnPix © 2020 - 2025</span>
        </div>
      </footer>
    </div>
  )
}
