import ReactDOM from 'react-dom/client';
import { act } from "react-dom/test-utils";

export const createRootElement = () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);
    const root = ReactDOM.createRoot(rootDiv);
    return ({rootDiv, root})
}

export const unmountRoot = (root: ReactDOM.Root) => {
    if (root) {
        act(() => {
            root.unmount();
        })
    }
}