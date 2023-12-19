import { Helmet } from "react-helmet-async";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DropdownListTile from "../components/ui/DropdownListTile";
import IconButton from "../components/ui/IconButton";
import LinkListTile from "../components/ui/LinkListTile";
import useTheme, { ThemeMode } from "../providers/ThemeProvider";
import useUser, { UserType } from "../providers/UserProvider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, setType, setName } = useUser();
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
        label={`${user.isTeacher ? "Docente" : "Classe"} (prossimamente)`} //TODO remove wip text
        value={user.name}
        onChange={setName}
        placeholder={`Scegli ${user.isTeacher ? "un docente" : "una classe"}...`}
        options={[]} //TODO fetch classes/teachers
        disabled //TODO remove
      />
      <LinkListTile label="Scarica l'applicazione Android" href="https://play.google.com/store/apps/details?id=com.itetpilati.itetsostituzioni" />
      {/* //TODO link to install pwa? */}
    </main>
  </>);
}