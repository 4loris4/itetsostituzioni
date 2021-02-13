import React from "react";
import ElementDetails from "./ElementDetails";

const schoolHour = { 1: "07.50 - 08.40", 2: "08.40 - 09.30", 3: "09.30 - 10.20", 4: "10.30 - 11.20", 5: "11.20 - 12.10", 6: "12.10 - 13.00", 7: "13.30 - 14.20", 8: "14.20 - 15.10", 9: "15.10 - 16.00", 10: "16.00 - 16.50" };

const SubstitutionsDetails = (props: { view: "class" | "teacher", substitutions: { hidden: boolean, title: string, items: SubstitutionElement[]; }; setDetails: React.Dispatch<React.SetStateAction<{ hidden: boolean, items: SubstitutionElement[]; }>>; }) => {
    return <div id="substitutionsDetails" className={props.substitutions.hidden ? "hidden" : ""}>
        <header>
            <div title="Indietro" onClick={() => { props.setDetails({ ...props.substitutions, hidden: true }); }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </g>
                </svg>
            </div>
            <p>Sostituzioni {props.view == "class" ? "della classe" : "di"} {props.substitutions.title}</p>
        </header>
        <div>
            {props.substitutions.items.sort((a, b) => a.orario > b.orario ? 1 : -1).map((substitution, i) => (
                <ElementDetails key={i} title={`${substitution.orario}° ora`} subtitle={schoolHour[substitution.orario]} elements={[
                    {
                        icon: "fas fa-user",
                        title: substitution.docenteAssente,
                        trailing: "Assente"
                    },
                    (props.view == "class" ?
                        {
                            icon: "far fa-user",
                            title: substitution.docenteSostituto,
                            trailing: props.view == "class" ? "Sostituto" : "Classe"
                        } : {
                            icon: "fas fa-map-marker-alt",
                            title: substitution.classe,
                            trailing: "Classe"
                        }
                    ),
                    (substitution.note == "" ? undefined : {
                        icon: "fas fa-file-alt",
                        title: substitution.note,
                        trailing: "Note"
                    })
                ].filter(item => item)} />
            ))}
        </div>
    </div>;
};

export default SubstitutionsDetails;