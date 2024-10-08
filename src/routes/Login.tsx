import { Button, Input, Link, TextField } from "@suid/material";
import axios, { AxiosError } from "axios";
import { createSignal } from "solid-js";
import useAuth, { User } from "../hooks/useAuth";
import toast from "solid-toast";
import { redirect } from "@solidjs/router";
type LoginForm = {
    email: string;
    password: string;
}

export default function Login() {
    const { user, storeUser } = useAuth(false);
    const [form, setForm] = createSignal<LoginForm>({ email: "", password: "" });
    const [err, setErr] = createSignal("");

    const login = async () => {
        const data = form();
        if (data.email.length < 5) {
            setErr("Email is too short!");
            return;
        }

        if (data.password.length < 5) {
            setErr("Password is too short!");
            return;
        }

        setErr("");

        try {
            const res = await axios.post<{ message: string, data: User }>("http://localhost:8080/users/login", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                storeUser(res.data.data);
                toast.success("Successfully logged in!");
            }

        } catch (err: any) {
            setErr(err?.response?.data?.message ?? "Unknown error occured");
        }
    }
    console.log(user())

    return (
        <div class="auth-bg">
            <div class="auth">
                <h2>Login</h2>
                <p class="err">{err().length > 0 && err()} </p>
                <div class="field-container">
                    <TextField label="Email" id="auth-email" placeholder="Enter Email" type="email" value={form().email} onChange={e => setForm({ ...form(), email: e.target.value })} />
                </div>
                <div class="field-container">
                    <TextField label="Password" id="auth-pass" placeholder="Enter Password" type="password" value={form().password} onChange={e => setForm({ ...form(), password: e.target.value })} />
                </div>
                <div>
                    <Link sx={{ textDecoration: "none" }} as={"a"} href="/register">Don't have an account? Register here</Link>
                </div>
                <div>
                    <Button variant="contained" onclick={() => login()}>Login</Button>
                </div>
            </div>
        </div>
    )
}
