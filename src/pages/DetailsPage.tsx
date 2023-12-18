import { MdArrowBack } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DetailsTile from "../components/substitutions/DetailsTile";
import IconButton from "../ui/IconButton";
import { SubstitutionsData } from "./SubstitutionsPage";

type LocationState = {
  user: string;
  substitutions: SubstitutionsData["sostituzioni"];
};

const timetables = ["07:50 - 08:40", "08:40 - 09:30", "09:30 - 10:20", "10:30 - 11:20", "11:20 - 12:10", "12:10 - 13:00", "13:30 - 14:20", "14:20 - 15:10", "15:10 - 16:00", "16:00 - 16:50"];

export default function DetailsPage() {
  const navigate = useNavigate();
  const state = useLocation().state as LocationState | undefined;

  try {
    const { user, substitutions } = state!;

    return (<>
      <Header
        leading={<IconButton icon={MdArrowBack} title="Indietro" onClick={() => navigate("/")} />}
        title={`Sostituzione della classe ${user}`} //TODO user...
      />
      <main>
        {substitutions.sort((a, b) => a.orario - b.orario).map(({ orario }, i) => (
          <DetailsTile
            key={i}
            title={`${orario}° ora`}
            subtitle={timetables[orario]}
          />
        ))}
      </main>
    </>);
  }
  catch (_) {
    return <Navigate to={"/"} />;
  }
}