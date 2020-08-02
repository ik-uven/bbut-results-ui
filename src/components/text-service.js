
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
            translation = "Avslutad";
            break;
        case "NO_SHOW":
            translation = "Frånvarande";
            break;
        default:
            break;
    }

    return translation;
};

export const classTranslator = (participantClass) => {
    let translation;

    switch (participantClass) {
        case "MEN":
            translation = "Herrar";
            break;
        default:
            translation = "Damer";
            break;
    }

    return translation;
};

export default stateTranslator;
