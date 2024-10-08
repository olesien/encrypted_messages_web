import { Button } from "@suid/material";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import toast from "solid-toast";
import axios from "axios";

export default function Account() {
    const { user, logout } = useAuth(true);
    const deleteAccount = async () => {
        const yes = confirm("Are you sure you would like to delete your account?");
        if (yes) {
            try {
                const res = await axios.delete<{ message: string, data: null }>("http://localhost:8080/users/deleteaccount", {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true
                });
                console.log(res.data);
                if (res.data) {
                    toast.success("Deleted account!");
                    logout();
                }

            } catch (err) {
                console.error(err);
                toast.error("Failed to delete account.");
            }

        }

    }
    return (
        <div>
            <Header logout={logout} />
            <main class="account">
                <p>Name: {user()?.name ?? ""}</p>
                <p>Mail: {user()?.email ?? ""}</p>
                <Button onClick={deleteAccount} color="error">Delete Account</Button>
            </main>
        </div>
    )
}
