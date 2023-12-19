import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import IconButton from "../components/ui/IconButton";

export default function SettingsPage() { //TODO settings
  const navigate = useNavigate();

  return (<>
    <Header
      leading={<IconButton icon={MdClose} title="Chiudi" onClick={() => navigate("/")} />}
      title="Impostazioni"
    />
    <main>
      <p>TODO</p>
    </main>
  </>);
}