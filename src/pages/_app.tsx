import type { AppProps } from "next/app";
import "../../styles/globals.css";

import LayoutWrapper from "../components/layout-wrapper";
import { AuthProvider } from "../modules/auth/context/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </AuthProvider>
  );
}
