import { DateTime } from "luxon";
import { z } from "zod";
import Header from "../components/Header";
import DetailsTile from "../components/substitutions/DetailsTile";
import SubstitutionTile from "../components/substitutions/SubstitutionTile";
import { useFetch } from "../fetch";

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

export default function Substitutions() {
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
    <Header date={substitutions.data?.data} />
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
        loading: () => <p>loading</p>, //TODO
        error: (e) => <p>error {e.message}</p> //TODO
      })}
    </main>
  </>);
}