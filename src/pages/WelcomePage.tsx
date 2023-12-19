import Button from "../components/ui/Button";
import useUser, { UserType } from "../providers/UserProvider";
import styles from "./WelcomePage.module.scss";

export default function WelcomePage() {
  const { setType } = useUser();

  return (
    <main className={styles.welcomePage}>
      <h1>Benvenuto nell'app!</h1>
      <div className={styles.content}>
        <span>Prima di iniziare, scegli se vuoi utilizzare l'app come studente o come docente.</span>
        <span>Potrai cambiare nuovamente questa opzione nelle impostazioni (in alto a destra).</span>
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => setType(UserType.teacher)}>Sono un docente</Button>
        <Button onClick={() => setType(UserType.student)}>Sono uno studente</Button>
      </div>
    </main>
  );
}