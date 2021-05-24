import { ComponentState } from "../lib/appState";
import { ComponentMessage } from '../lib/appMessages';

export function renderViewingState(state: ComponentState, dispatch: ((msg: ComponentMessage) => any)): HTMLElement {
    let viewingRoot = document.querySelector("#viewing") as HTMLTemplateElement;
    let viewingElement = viewingRoot.content.firstElementChild.cloneNode(true) as HTMLElement;
    let iframe = viewingElement.querySelector("iframe") as HTMLIFrameElement;
    iframe.style.height = `100vh`;
    iframe.style.width = `100vw`;
    iframe.src = `${state.gameRoomUrl}`;

    if (state.currentClient.clientUuid == state.initializer.clientUuid) {
        let dialog = viewingElement.querySelector("#dialog") as HTMLElement;
        dialog.style.display = 'flex';
        let closeBtn = dialog.querySelector("button") as HTMLButtonElement;

        closeBtn.onclick = (event: Event) => {
            dialog.style.display = 'none'
        };
    }

    return viewingElement;
}