import { Helmet } from "react-helmet-async";
import { MdArrowBack, MdAssignment, MdPermIdentity, MdPerson, MdRoom } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FullscreenDetails from "../components/FullscreenDetails";
import Header from "../components/Header";
import DetailsElement from "../components/substitutions/DetailsElement";
import DetailsTile from "../components/substitutions/DetailsTile";
import IconButton from "../components/ui/IconButton";
import useUser from "../providers/UserProvider";
import { SubstitutionsData } from "./SubstitutionsPage";

export type DetailsPageState = {
  name: string;
  substitutions: SubstitutionsData["sostituzioni"];
};

const timetables = ["07:50 - 08:40", "08:40 - 09:30", "09:30 - 10:20", "10:30 - 11:20", "11:20 - 12:10", "12:10 - 13:00", "13:30 - 14:20", "14:20 - 15:10", "15:10 - 16:00", "16:00 - 16:50"];

export default function DetailsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const state = useLocation().state as DetailsPageState | undefined;

  try {
    const { name, substitutions } = state!;

    return (<>
      <Helmet>
        <title>{name} - ITET Sostituzioni</title>
      </Helmet>
      <Header
        leading={<IconButton icon={MdArrowBack} title="Indietro" onClick={() => navigate("/")} />}
        title={`Sostituzione ${user.isTeacher ? "di" : "della classe"} ${name}`}
      />
      <main>
        {substitutions.length == 0 ?
          <FullscreenDetails title="Nessuna sostituzione trovata" subtitle={`Non sono previste sostituzioni per ${user.isTeacher ? "te" : "la tua classe"}!`} /> :
          (
            substitutions.sort((a, b) => a.orario - b.orario).map(({ orario, docenteAssente, classe, docenteSostituto, note }, i) => (
              <DetailsTile key={i} title={`${orario}° ora`} subtitle={timetables[orario - 1]}>
                <DetailsElement icon={user.isTeacher ? MdPerson : MdPermIdentity} title={docenteAssente} trailing="Assente" />
                {user.isTeacher ?
                  <DetailsElement icon={MdRoom} title={classe} trailing="Classe" /> :
                  <DetailsElement icon={MdPerson} title={docenteSostituto} trailing="Sostituto" />
                }
                {note != "" &&
                  <DetailsElement icon={MdAssignment} title={note} trailing="Note" />
                }
              </DetailsTile>
            ))
          )
        }
      </main>
    </>);
  }
  catch (_) {
    return <Navigate to={"/"} />;
  }
}