import Head from "next/head";
import { Inter } from "next/font/google";
import Menu from "@/components/Menu/Menu";
import styles from "@/styles/Home.module.css";
import LivroLista from "./LivroLista";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Projeto em nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <Menu />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
}
