// src/pages/organizacao/index.tsx

import { GetServerSideProps } from "next"

export default function OrganizacaoPage() {
  return null // essa página nunca será renderizada, pois o redirecionamento ocorre no servidor
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/organizacao/usuarios",
      permanent: false,
    },
  }
}
