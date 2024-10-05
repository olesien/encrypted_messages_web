import { redirect, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, on } from "solid-js";

export type User = {
    name: string;
    mail: string;
    token: string;
}
const key = "auth-user";
function useAuth(expectLoggedIn: boolean) {
    const [user, setUser] = createSignal<User | null>(null);
    const navigate = useNavigate();
    createEffect((prevSum) => {
        // do something with `a` and `prevSum`
        console.log("Retrieving");
        if (typeof window === "undefined") {
            return;
        }
        console.log("A");
        try {
            const item = window.localStorage.getItem(key);
            console.log("B");
            const user = item !== null && item != "undefined"
                ? (JSON.parse(item) as User)
                : null
            setUser(
                user
            );

            if (user) {
                //Check if state is logged in, but this is from login/register
                if (!expectLoggedIn) {
                    console.log("redirecting to /")
                    navigate("/", { replace: true });
                }
            } else {
                //User is undefined but we are trying to visit from home
                if (expectLoggedIn) {
                    console.log("redirecting to /login")
                    navigate("/login", { replace: true });
                }
            }
            console.log(item !== null && item != "undefined"
                ? (JSON.parse(item) as User)
                : null);
        } catch (error) {
            return;
        }
    }, 0)

    const storeUser: (v: User) => void = (value) => {
        try {
            setUser(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    const removeUser: () => void = () => {
        try {
            setUser(null);
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };
    return [user, storeUser, removeUser] as const;
}

export default useAuth;