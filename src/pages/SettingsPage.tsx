import { Helmet } from "react-helmet-async";
import { MdClose, MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { classesUrl, teachersUrl } from "../Constants";
import Header from "../components/Header";
import DropdownListTile from "../components/ui/DropdownListTile";
import IconButton from "../components/ui/IconButton";
import LinkListTile from "../components/ui/LinkListTile";
import Spinner from "../components/ui/Spinner";
import useFetch from "../hooks/useFetch";
import useTheme, { ThemeMode } from "../providers/ThemeProvider";
import useUser, { UserType } from "../providers/UserProvider";

const teachersSchema = z.array(
  z.object({
    cognome: z.string(),
    nome: z.string(),
  }).transform(({ cognome, nome }) => `${cognome} ${nome}`)
);

const classesSchema = z.array(z.string());

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, setType, setName } = useUser();
  const usersList = user.isTeacher ? useFetch(teachersUrl, teachersSchema) : useFetch(classesUrl, classesSchema);
  const navigate = useNavigate();

  return (<>
    <Helmet>
      <title>Impostazioni - ITET Sostituzioni</title>
    </Helmet>
    <Header
      leading={<IconButton icon={MdClose} title="Chiudi" onClick={() => navigate("/")} />}
      title="Impostazioni"
    />
    <main>
      <DropdownListTile<ThemeMode>
        label="Tema"
        value={theme}
        onChange={setTheme}
        options={[
          { value: "device", label: "Dispositivo" },
          { value: "light", label: "Chiaro" },
          { value: "dark", label: "Scuro" }
        ]}
      />
      <DropdownListTile<UserType>
        label="Ruolo"
        value={user.type!}
        onChange={setType}
        options={[
          { value: UserType.teacher, label: "Docente" },
          { value: UserType.student, label: "Studente" }
        ]}
      />
      <DropdownListTile<string>
        label={user.isTeacher ? "Docente" : "Classe"}
        value={user.name}
        onChange={setName}
        placeholder={`Scegli ${user.isTeacher ? "un docente" : "una classe"}...`}
        {...usersList.when({
          data: (usersList) => ({
            options: usersList.map(user => ({ value: user, label: user })),
          }),
          loading: () => ({
            options: undefined,
            fallback: {
              label: "Caricamento...",
              trailing: <Spinner />
            },
          }),
          error: () => ({
            options: undefined,
            fallback: {
              error: true,
              label: "Errore",
              trailing: <IconButton icon={MdRefresh} title="Riprova" onClick={() => usersList.refetch()} />
            },
          })
        })}
      />
      <LinkListTile label="Scarica l'applicazione Android" href="https://play.google.com/store/apps/details?id=com.itetpilati.itetsostituzioni" />
    </main>
  </>);
}