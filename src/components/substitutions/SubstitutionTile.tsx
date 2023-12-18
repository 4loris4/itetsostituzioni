import { useNavigate } from "react-router-dom";
import { SubstitutionsData } from "../../pages/SubstitutionsPage";
import styles from "./SubstitutionTile.module.scss";

type Props = {
  user: string;
  substitutions: SubstitutionsData["sostituzioni"];
};

export default function SubstitutionTile({ user, substitutions }: Props) { //TODO open details
  const navigate = useNavigate();

  return (
    <button className={styles.substitutionTile} onClick={() => navigate("/details", { state: { user, substitutions } })}> {/* //TODO teacher or student */}
      <span>{user}</span>
      <span className={styles.count}>{substitutions.length} {substitutions.length == 1 ? "sostituzione" : "sostituzioni"}</span>
    </button>
  );
}