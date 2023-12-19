import { useNavigate } from "react-router-dom";
import { DetailsPageState } from "../../pages/DetailsPage";
import { SubstitutionsData } from "../../pages/SubstitutionsPage";
import styles from "./SubstitutionTile.module.scss";

type Props = {
  name: string;
  substitutions: SubstitutionsData["sostituzioni"];
};

export default function SubstitutionTile({ name, substitutions }: Props) {
  const navigate = useNavigate();

  return (
    <button className={styles.substitutionTile} onClick={() => navigate("/details", { state: { name, substitutions } as DetailsPageState })}>
      <span>{name}</span>
      <span className={styles.count}>{substitutions.length} {substitutions.length == 1 ? "sostituzione" : "sostituzioni"}</span>
    </button>
  );
}