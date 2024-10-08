import { redirect } from "@solidjs/router";
import useAuth from "../hooks/useAuth";
import { Button } from "@suid/material";
import { QueryClient, QueryClientProvider, createMutation, createQuery } from '@tanstack/solid-query'
import { createEffect, Match, on, Switch } from "solid-js";
import axios from "axios";
import Messages, { EncryptedMessage } from "../components/Messages";
import toast from "solid-toast";
import { queryClient } from "../App";
import { reconcile } from "solid-js/store";
import Header from "../components/Header";

export default function Home() {
    const { logout } = useAuth(true);

    const query = createQuery(() => ({
        queryKey: ['encrypted_messages'],
        queryFn: async () => {
            const response = await axios.get<{ message: string; data: EncryptedMessage[] }>(
                'http://localhost:8080/users/encrypted_messages',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true
                }
            )
            return response.data;

        },
        reconcile: (oldData, newData) => reconcile(newData)(oldData), //Fixer for rerendering issues on refetch
    }))

    createEffect(
        on(
            () => query.error,
            () => {
                if (query.error && query.error.message.includes("403")) {
                    toast.error("Logged out due to token expiry");
                    logout();
                }
            }
        )
    );

    const addMessage = async () => {
        try {
            const res = await axios.post<{ message: string, data: EncryptedMessage }>("http://localhost:8080/users/encrypted_message", { title: "Title here", message: "This message is encrypted!" }, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                toast.success("Saved encrypted message!");
                await query.refetch();
            }

        } catch (err) {
            toast.error("Failed to save message.");
        }
    }

    const trash = async (messageId: number) => {
        try {
            const res = await axios.delete<{ message: string, data: null }>("http://localhost:8080/users/encrypted_message/delete/" + messageId, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                toast.success("Deleted message!");
                await query.refetch();
            }

        } catch (err) {
            toast.error("Failed to delete message.");
        }
    }

    const update = async (message: EncryptedMessage) => {
        try {
            const res = await axios.put<{ message: string, data: EncryptedMessage }>("http://localhost:8080/users/encrypted_message", message, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                toast.success("Saved!");
                await query.refetch();
            }

        } catch (err) {
            toast.error("Failed to save message.");
        }
    }

    return (
        <div>
            <Header logout={logout} />
            <h2>Home</h2>
            <Switch>
                <Match when={query.isPending}>Loading...</Match>
                <Match when={query.error}>
                    {'An error has occurred: ' + (query.error as Error).message}
                </Match>
                <Match when={query.data}>
                    <div>
                        <Messages messages={query.data?.data || []} trash={trash} update={update} />
                        <div>
                            <Button onClick={addMessage}>New Message</Button>
                        </div>
                    </div>
                </Match>

            </Switch>
        </div >
    )
}
