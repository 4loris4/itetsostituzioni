import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../Utilities";
import Substitutions from "./Substitutions";
import SubstitutionsDetails from "./SubstitutionsDetails";

const App = (props: { view: "class" | "teacher"; }) => {
    const [error, setError] = useState<boolean>(false);
    const [substitutions, setSubstitutions] = useState<SubstitutionsJSON>();
    const [substitutionsDetails, setSubstitutionsDetails] = useState<{ hidden: boolean, title: string, items: SubstitutionElement[]; }>({ hidden: true, title: "", items: [] });
    const date = substitutions?.data ? new Date(substitutions.data.split("/").reverse().join("-")) : new Date();

    useEffect(() => {
        setTimeout(async () => {
            fetch("https://cors-anywhere.herokuapp.com/https://www.istitutopilati.it/gestione_sostituzioni/sostituzioni/listaPubblica.json").then(async result => {
                setSubstitutions(await result.json());
            }).catch(() => {
                setError(true);
            });
        }, 1000);
    }, []);

    function getSubstitutionsArray(substitutions: SubstitutionsJSON): { user: string, substitutions: SubstitutionElement[]; }[] {
        if (!substitutions) { return []; }

        const result: { user: string, substitutions: SubstitutionElement[]; }[] = [];
        substitutions.sostituzioni.forEach(sostituzione => {
            let currentElement = result.filter((item) => item.user == (props.view == "class" ? sostituzione.classe : sostituzione.docenteSostituto))[0];
            if (!currentElement) {
                currentElement = { user: (props.view == "class" ? sostituzione.classe : sostituzione.docenteSostituto), substitutions: [] };
                result.push(currentElement);
            }
            currentElement.substitutions.push(sostituzione);
        });
        return result.sort((a, b) => (a.user > b.user ? 1 : -1));
    }

    function resetView() {
        localStorage.removeItem("view");
        location.reload();
    }

    return <>
        <header>
            <p>Sostituzioni di {`${capitalizeFirstLetter(new Intl.DateTimeFormat("it", { weekday: "long" }).format(date))} ${date.getDate()} ${capitalizeFirstLetter(new Intl.DateTimeFormat("it", { month: "long" }).format(date))} ${date.getFullYear()}`}</p>
            <div onClick={resetView} title="Cambia visualizzazione">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                    </g>
                </svg>
            </div>
        </header>
        <Substitutions substitutions={getSubstitutionsArray(substitutions)} itp={{ itp1: substitutions?.itp1, itp2: substitutions?.itp2 }} setDetails={setSubstitutionsDetails} />
        <SubstitutionsDetails view={props.view} substitutions={substitutionsDetails} setDetails={setSubstitutionsDetails} />
        <div id="loader" className={substitutions || error ? "hidden" : ""}>
            <div id="loaderSpinner" className="spinner">
                <svg>
                    <circle cx="50%" cy="50%" r="45%" fill="none" strokeWidth="10%" strokeMiterlimit="10" />
                </svg>
            </div>
        </div>
        {!error ? undefined :
            <div id="error">
                <p>Impossibile caricare le sostituzioni<br />in questo momento</p>
                <p>Riprova più tardi</p>
            </div>
        }
    </>;
};

export default App;