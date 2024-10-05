import { redirect } from "@solidjs/router";
import useAuth from "../hooks/useAuth";
import { Button } from "@suid/material";
import { QueryClient, QueryClientProvider, createQuery } from '@tanstack/solid-query'
import { Match, Switch } from "solid-js";
import axios from "axios";

export default function Home() {
    const [user, setUser, logOut] = useAuth(true);

    const query = createQuery(() => ({
        queryKey: ['encrypted_messages'],
        queryFn: async () => {
            const response = await axios.get(
                'http://localhost:8080/users/encrypted_messages',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true
                }
            )
            return await response.data;

        },
    }))

    return (
        <div>
            <h2>Home</h2>
            <Switch>
                <Match when={query.isPending}>Loading...</Match>
                <Match when={query.error}>
                    {'An error has occurred: ' + (query.error as Error).message}
                </Match>
                <Match when={query.data !== undefined}>
                    <div>
                        <h1>{query.data.message}</h1>
                    </div>
                </Match>
            </Switch>
            <Button onClick={logOut}>Logout</Button>
        </div >
    )
}
