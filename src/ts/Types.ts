type SubstitutionElement = {
    docenteSostituto: string,
    orario: number,
    classe: string,
    docenteAssente: string,
    note: string;
};

type SubstitutionsJSON = {
    data: string,
    timestamp: string,
    sostituzioni: SubstitutionElement[],
    itp1: string,
    itp2: string;
};