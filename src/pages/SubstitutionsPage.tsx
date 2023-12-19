import { DateTime } from "luxon";
import React from "react";
import { Helmet } from "react-helmet-async";
import { MdPermIdentity, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { substitutionsUrl } from "../Constants";
import FullscreenDetails from "../components/FullscreenDetails";
import Header from "../components/Header";
import DetailsElement from "../components/substitutions/DetailsElement";
import DetailsTile from "../components/substitutions/DetailsTile";
import SubstitutionTile from "../components/substitutions/SubstitutionTile";
import IconButton from "../components/ui/IconButton";
import Loader from "../components/ui/Loader";
import useFetch from "../hooks/useFetch";
import useUser, { UserType } from "../providers/UserProvider";
import styles from "./SubstitutionsPage.module.scss";

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
  const { user } = useUser();
  const navigate = useNavigate();
  const substitutions = useFetch(substitutionsUrl, substitutionsSchema);

  const groupSubstitutions = (substitutions: SubstitutionsData["sostituzioni"]): Map<string, SubstitutionsData["sostituzioni"]> => {
    const groups = new Map<string, SubstitutionsData["sostituzioni"]>();

    for (const substitution of substitutions) {
      const key = user.isTeacher ? substitution.docenteSostituto : substitution.classe;
      (groups.has(key) ? groups : groups.set(key, [])).get(key)!.push(substitution);
    }

    //If we have set a class, also add congregated substitutions for our class
    if (user.type == UserType.student && user.name != null) {
      for (const substitution of substitutions) {
        if (substitution.classe != user.name && substitution.classe.includes(user.name)) {
          (groups.has(user.name) ? groups : groups.set(user.name, [])).get(user.name)!.push(substitution);
        }
      }
    }

    return groups;
  };

  const buildPage = ({ body, date, timestamp }: { body: React.ReactNode; date?: DateTime; timestamp?: string; }) => {
    return (<>
      <Helmet>
        <title>ITET Sostituzioni</title>
      </Helmet>
      <Header
        title={date?.setLocale("it").toFormat("'Sostituzioni di' cccc d LLLL") ?? "ITET Sostituzioni"}
        actions={<IconButton icon={MdSettings} title="Impostazioni" onClick={() => navigate("/settings")} />}
      />
      <main>{body}</main>
      {timestamp != undefined &&
        <footer className={styles.footer}>{`Pubblicate il ${timestamp.replace(" ", " alle ")}`}</footer>
      }
    </>);
  };

  return substitutions.when({
    data: (substitutionData) => {
      const groupedSubstitutions = groupSubstitutions(substitutionData.sostituzioni);
      const itpEmpty = substitutionData.itp1 == "" && substitutionData.itp2 == "";

      return buildPage({
        date: substitutionData.data,
        timestamp: substitutionData.timestamp,
        body: (groupedSubstitutions.size == 0 && itpEmpty) ?
          <FullscreenDetails title="Nessuna sostituzione trovata" subtitle="Non sono previste sostituzioni per questa giornata!" /> :
          (<>
            {[...groupedSubstitutions.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, substitutions], i) => {
              return <SubstitutionTile key={i} name={name} substitutions={substitutions} />;
            })}
            {!itpEmpty &&
              <DetailsTile title="ITP">
                {substitutionData.itp1 != "" &&
                  <DetailsElement icon={MdPermIdentity} title={substitutionData.itp1} trailing="ITP Assenti" />
                }
                {substitutionData.itp2 != "" &&
                  <DetailsElement icon={MdPermIdentity} title={substitutionData.itp2} trailing="Coperti da ITP" />
                }
              </DetailsTile>
            }
          </>),
      });
    },
    loading: () => buildPage({ body: <Loader /> }),
    error: () => buildPage({ body: <FullscreenDetails title="Impossibile scaricare le sostituzioni" subtitle="Riprova più tardi" isError /> })
  });
}