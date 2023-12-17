import { SubstitutionsData } from "../../pages/Substitutions";
import styles from "./SubstitutionTile.module.scss";

type Props = {
  user: string;
  substitutions: SubstitutionsData["sostituzioni"];
};

export default function SubstitutionTile({ user, substitutions }: Props) { //TODO open details
  return (
    <div className={styles.substitutionTile}> {/* //TODO teacher or student */}
      <span>{user}</span>
      <span className={styles.count}>{substitutions.length} {substitutions.length == 1 ? "sostituzione" : "sostituzioni"}</span>
    </div>
  );
}