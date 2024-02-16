import Form from "@/components/Form";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className="App">
        <div>
          <p>
            Aquí haremos nuestro TO-DO list
          </p>
          <Form></Form>
        </div>
      </div>
    </main>
  );
}