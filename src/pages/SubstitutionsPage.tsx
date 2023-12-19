import { DateTime } from "luxon";
import { MdPermIdentity, MdSettings, MdSunny, MdToggleOff, MdToggleOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { substitutionsUrl } from "../Constants";
import Header from "../components/Header";
import DetailsElement from "../components/substitutions/DetailsElement";
import DetailsTile from "../components/substitutions/DetailsTile";
import SubstitutionTile from "../components/substitutions/SubstitutionTile";
import FullscreenDetails from "../components/ui/FullscreenDetails";
import IconButton from "../components/ui/IconButton";
import Loader from "../components/ui/Loader";
import useFetch from "../hooks/useFetch";
import useTheme from "../providers/ThemeProvider";
import useUser, { UserType } from "../providers/UserProvider";

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
  const { user, setType } = useUser();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const substitutions = useFetch(substitutionsUrl, substitutionsSchema);

  const groupSubstitutions = (substitutions: SubstitutionsData["sostituzioni"]): Map<string, SubstitutionsData["sostituzioni"]> => {
    const groups = new Map<string, SubstitutionsData["sostituzioni"]>();

    for (const substitution of substitutions) {
      const key = user.isTeacher ? substitution.docenteSostituto : substitution.classe;
      (groups.has(key) ? groups : groups.set(key, [])).get(key)!.push(substitution);
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
      actions={<>
        <IconButton icon={MdSunny} title={"Theme"} onClick={() => setTheme(theme == "light" ? "dark" : theme == "dark" ? "device" : "light")} /> {/* //TODO remove */}
        <IconButton icon={user.isTeacher ? MdToggleOff : MdToggleOn} title={user.isTeacher ? "Teacher" : "Student"} onClick={() => setType(user.isTeacher ? UserType.student : UserType.teacher)} /> {/* //TODO remove */}
        <IconButton icon={MdSettings} title="Impostazioni" onClick={() => navigate("/settings")} />
      </>}
    />
    <main>
      {substitutions.when({
        //TODO handle empty...
        data: (data) => {
          const groupedSubstitutions = groupSubstitutions(data.sostituzioni);
          return (<>
            {[...groupedSubstitutions.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, substitutions], i) => {
              return <SubstitutionTile key={i} name={name} substitutions={substitutions} />;
            })}
            {(data.itp1 != "" || data.itp2 != "") &&
              <DetailsTile title="ITP">
                {data.itp1 != "" &&
                  <DetailsElement icon={MdPermIdentity} title={data.itp1} trailing="ITP Assenti" />
                }
                {data.itp2 != "" &&
                  <DetailsElement icon={MdPermIdentity} title={data.itp2} trailing="Coperti da ITP" />
                }
              </DetailsTile>
            }
          </>);
        },
        loading: () => <Loader />,
        error: () => <FullscreenDetails title="Impossibile scaricare le sostituzioni" subtitle="Riprova più tardi" isError />
      })}
    </main>
  </>);
}