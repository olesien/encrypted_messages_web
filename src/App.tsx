import { Toaster } from 'solid-toast';
import styles from './App.module.css';
import Button from '@suid/material/Button';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

export const queryClient = new QueryClient()
const App = (props: any) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div class={styles.App}>
                {props.children}
                <Toaster />
            </div>
        </QueryClientProvider>

    );
};

export default App;
