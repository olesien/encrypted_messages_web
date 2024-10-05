import { Toaster } from 'solid-toast';
import styles from './App.module.css';
import Button from '@suid/material/Button';


const App = (props: any) => {
    return (
        <div class={styles.App}>
            {props.children}
            <Toaster />
        </div>

    );
};

export default App;
