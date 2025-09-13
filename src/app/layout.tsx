import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ 
  subsets: ["latin"], 
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Juego de Gato - Dayanara Edition",
  description: "Juego de tic-tac-toe personalizado con mensajes divertidos para Dayanara",
  keywords: "juego, gato, tic-tac-toe, Dayanara, diversión",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="es" className="h-full">
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased h-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500`}>
        <div className="min-h-full flex flex-col">
          <main className="flex-1 flex items-center justify-center p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}