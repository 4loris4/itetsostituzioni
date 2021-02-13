import React from "react";
import ElementDetails from "./ElementDetails";
import SubstitutionsElement from "./SubstitutionElement";

const Substitutions = (props: { substitutions: { user: string, substitutions: SubstitutionElement[]; }[]; itp: { itp1: string, itp2: string; }; setDetails: React.Dispatch<React.SetStateAction<{ hidden: boolean, title: string, items: SubstitutionElement[]; }>>; }) => {
    const itp: { icon: string; title: string; trailing: string; }[] = [];
    if (props.itp.itp1 && props.itp.itp1 != "") {
        itp.push({
            icon: "far fa-user",
            title: props.itp.itp1,
            trailing: "ITP Assenti"
        });
    }
    if (props.itp.itp2 && props.itp.itp2 != "") {
        itp.push({
            icon: "far fa-user",
            title: props.itp.itp2,
            trailing: "Coperti da ITP"
        });
    }

    return <div>
        {props.substitutions.length != 0 ?
            props.substitutions.map((substitution, i) => (
                <SubstitutionsElement key={i} title={substitution.user} subtitle={`${substitution.substitutions.length} ${substitution.substitutions.length == 1 ? "sostituzione" : "sostituzioni"}`} onClick={() => { props.setDetails({ hidden: false, title: substitution.user, items: substitution.substitutions }); }} />
            )) :
            <div id="empty">
                <p>Nessuna sostituzione trovata</p>
                <p>Non sono previste sostituzioni per questa giornata!</p>
            </div>
        }
        {itp.length == 0 ? undefined :
            <ElementDetails title="ITP" elements={itp} />
        }
    </div>;
};

export default Substitutions;