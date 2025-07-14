import DashboardContent from '../painel/index'

import { render, screen } from '@testing-library/react'// ajuste o caminho conforme seu projeto

describe('DashboardContent', () => {
  it('renderiza o título principal e cards', () => {
    render(<DashboardContent />)

    expect(screen.getByText(/Painel de Controle/i)).toBeInTheDocument()
    expect(screen.getByText(/Receita de quiosque/i)).toBeInTheDocument()
    expect(screen.getByText(/Impressão de quiosque/i)).toBeInTheDocument()
    expect(screen.getByText(/Sessão de quiosque/i)).toBeInTheDocument()
  })
})
