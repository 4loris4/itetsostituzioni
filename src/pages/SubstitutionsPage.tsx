import { DateTime } from "luxon";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Header from "../components/Header";
import DetailsTile from "../components/substitutions/DetailsTile";
import SubstitutionTile from "../components/substitutions/SubstitutionTile";
import { useFetch } from "../fetch";
import FullscreenDetails from "../ui/FullscreenDetails";
import IconButton from "../ui/IconButton";
import Loader from "../ui/Loader";

const substitutionsSchema = z.object({
  data: z.string().transform((date) => DateTime.fromJSDate(new Date(date.split("/").reverse().join("/")))),
  timestamp: z.string(),
  sostituzioni: z.array(z.object({
    docenteSostituto: z.string(),
    orario: z.number(),
    classe: z.string(),
    docenteAssente: z.string(),
    note: z.string(),
  })),
  itp1: z.string(),
  itp2: z.string(),
});

export type SubstitutionsData = z.infer<typeof substitutionsSchema>;

export default function SubstitutionsPage() {
  const navigate = useNavigate();
  const substitutions = useFetch("http://itetsostituzionitest.altervista.org/sostituzioni/listaPubblica.php", substitutionsSchema); //TODO change url

  const groupSubstitutions = (substitutions: SubstitutionsData["sostituzioni"]): Map<string, SubstitutionsData["sostituzioni"]> => {
    const groups = new Map<string, SubstitutionsData["sostituzioni"]>();

    for (const substitution of substitutions) {
      const user = /* user.isTeacher ? substitution.docenteSostituto :  */substitution.classe; //TODO user
      (groups.has(user) ? groups : groups.set(user, [])).get(user)!.push(substitution);
    }

    //If we have set a class, also add congregated substitutions for our class //TODO user.name
    /* if (user.type == UserType.student && user.name != null) {
      for (const substitution of substitutions) {
        if (substitution.classe != user.name && substitution.classe.includes(user.name!)) {
          (groups.has(user.name) ? groups : groups.set(user.name, [])).get(user.name)!.push(substitution);
        }
      }
    } */

    return groups;
  };

  return (<>
    <Header
      title={substitutions.data?.data.setLocale("it").toFormat("'Sostituzioni di' cccc d LLLL") ?? "ITET Sostituzioni"}
      actions={<IconButton icon={MdSettings} title="Impostazioni" onClick={() => navigate("/settings")} />}
    />
    <main>
      {substitutions.when({
        //TODO handle empty...
        data: (data) => {
          const groupedSubstitutions = groupSubstitutions(data.sostituzioni);
          return (<>
            {[...groupedSubstitutions.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([user, substitutions], i) => {
              return <SubstitutionTile key={i} user={user} substitutions={substitutions} />;
            })}
            <DetailsTile title="ITP" /> {/* //TODO itp */}
          </>);
        },
        loading: () => <Loader />,
        error: () => <FullscreenDetails title="Impossibile scaricare le sostituzioni" subtitle="Riprova più tardi" isError />
      })}
    </main>
  </>);
}