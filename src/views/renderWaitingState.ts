import { ComponentState } from '../lib/appState';
import { ComponentMessage } from '../lib/appMessages';

//Renders the waiting state
export function renderWaitingState(state: ComponentState, dispatch: ((msg: ComponentMessage) => any)): HTMLElement {
    let waitingRoot = document.querySelector("#waiting") as HTMLTemplateElement;
    let waitingElement = waitingRoot.content.firstElementChild.cloneNode(true) as HTMLElement;
    let label = waitingElement.querySelector("h3") as HTMLElement;
    label.innerHTML = `${state.initializer.clientName} is setting up a game`;
    return waitingElement;
}