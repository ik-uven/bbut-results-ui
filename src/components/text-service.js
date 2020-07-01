

export const nbsp = (string) => {
    return string !== null ? string.replace(/ /g, "\u00a0") : string;
};

const stateTranslator = (participantState) => {
    let translation = participantState;

    switch (participantState) {
        case "REGISTERED":
            translation = "Anmäld";
            break;
        case "ACTIVE":
            translation = "Aktiv";
            break;
        case "RESIGNED":
            translation = "Avslutat";
            break;
        case "NO_SHOW":
            translation = nbsp("Ej start");
            break;
        default:
            break;
    }

    return translation;
};

export const genderTranslator = (gender) => {
    let translation;

    switch (gender) {
        case "MALE":
            translation = "Man";
            break;
        default:
            translation = "Kvinna";
            break;
    }

    return translation;
};

export default stateTranslator;
