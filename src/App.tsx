import Button from "./components/Button/Button";
import "./App.css";
import {AlertProvider} from "./components/Alert/AlertContext";
import {Main} from "./screens/Main/Main";

function App() {
    return (
        <AlertProvider>
            <Main />
        </AlertProvider>
    )
}

export default App
