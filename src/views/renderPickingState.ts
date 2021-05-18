import { ComponentState } from "../lib/appState";
import { ComponentMessage } from "../lib/appMessages";
import { isValidGameRoomUrl } from "../lib/validation";

//Renders the picking state
export function renderPickingState(state: ComponentState, dispatch: ((msg: ComponentMessage) => any)): HTMLElement {
    let pickingRoot = document.querySelector("#picking") as HTMLTemplateElement;
    let picker = pickingRoot.content.cloneNode(true) as HTMLElement;

    let gameUrlInput = picker.querySelector("input");
    let openFileBtn = picker.querySelector("#start-game") as HTMLInputElement;

    let viewingRoot = document.querySelector("#viewing") as HTMLTemplateElement;
    viewingRoot.hidden = true;

    let errorLabel = picker.querySelector("#error") as HTMLElement;

    gameUrlInput.oninput = (event: Event) => {
        const val = gameUrlInput.value;

        gameUrlInput.classList.remove("invalid");
        gameUrlInput.classList.remove("valid");
        openFileBtn.classList.remove("valid");

        if (isValidGameRoomUrl(val)) {
            openFileBtn.removeAttribute("disabled");
            errorLabel.innerHTML = '';
            errorLabel.style.marginBottom = "0";
            errorLabel.style.marginTop = "0";

            gameUrlInput.style.color = "black";
            openFileBtn.classList.add("valid");
            gameUrlInput.classList.add("valid");
        } else {
            errorLabel.innerHTML = 'This is an invalid game room url';
            errorLabel.style.marginBottom = "16px";
            errorLabel.style.marginTop = "5px";

            openFileBtn.setAttribute("disabled", "disabled");
            gameUrlInput.classList.add("invalid");
            gameUrlInput.style.color = "red";
        }
    }
    //This sets up the google input element -> on input changed -> relay a message
    openFileBtn.onclick = (event: Event) => {
        //First draft -> google drive url needs to be validated, for now, this just accepts everything
        let url = gameUrlInput.value;
        dispatch({ type: "game-room-url-changed", payload: url });
    }

    return picker;
}