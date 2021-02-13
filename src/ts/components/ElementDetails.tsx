import React from "react";

const ElementDetails = (props: { title: string, subtitle?: string, elements: { icon: string, title: string, trailing: string; }[]; }) => {
    return <div className="substitutionsElement elementDetails">
        <div className="tile" onClick={(e) => e.currentTarget.parentElement.classList.toggle("open")}>
            <p>{props.title}</p>
            {!props.subtitle ? undefined :
                <p>{props.subtitle}</p>
            }
            <i className="fas fa-chevron-down" />
        </div>
        <div className="content" style={{ maxHeight: 48 * props.elements.length }}>
            {props.elements.map((element, i) => (
                <div key={i}>
                    <i className={element.icon} />
                    <p>{element.title}</p>
                    <p>{element.trailing}</p>
                </div>
            ))}
        </div>
    </div>;
};

export default ElementDetails;