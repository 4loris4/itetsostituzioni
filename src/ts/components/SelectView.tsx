import React from "react";

const SelectView = () => {
    function setView(view: "class" | "teacher") {
        localStorage.setItem("view", view);
        location.reload();
    }

    return <div id="selectView">
        <h1>Benvenuto nel sito!</h1>
        <p>Prima di iniziare, scegli se vuoi utilizzare il sito come studente o come docente.</p>
        <p>Potrai cambiare nuovamente questa opzione con il tasto in alto a destra.</p>
        <button onClick={() => setView("teacher")}>Sono un docente</button>
        <button onClick={() => setView("class")}>Sono uno studente</button>
    </div>;
};

export default SelectView;