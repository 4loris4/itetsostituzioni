import React from "react";

const SubstitutionsElement = (props: { title: string, subtitle: string; onClick?: (e: React.MouseEvent) => void; }) => {
    return <div className="substitutionsElement" onClick={props.onClick}>
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
    </div>;
};

export default SubstitutionsElement;