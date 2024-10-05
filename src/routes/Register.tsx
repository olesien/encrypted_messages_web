import { Button, Input, Link, TextField } from "@suid/material";
import axios, { AxiosError } from "axios";
import { createSignal } from "solid-js";
import useAuth, { User } from "../hooks/useAuth";
import toast from "solid-toast";
import { redirect } from "@solidjs/router";
type LoginForm = {
    name: string;
    email: string;
    password: string;
    password2: string;
}

export default function Register() {
    const [user, setUser] = useAuth(false);
    const [form, setForm] = createSignal<LoginForm>({ name: "", email: "", password: "", password2: "" });
    const [err, setErr] = createSignal("");

    const register = async () => {
        const data = form();
        if (data.email.length < 5) {
            setErr("Email is too short!");
            return;
        }

        if (data.password.length < 5) {
            setErr("Password is too short!");
            return;
        }

        if (data.password != data.password2) {
            setErr("Passwords do not match!");
            return;
        }
        try {
            const res = await axios.post<{ message: string, data: User }>("http://localhost:8080/users/register", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data) {
                setUser(res.data.data);
                toast.success("Successfully registered!");
            }
        } catch (err) {
            setErr((err as AxiosError)?.message ?? "Unknown error occured");
        }
    }
    return (
        <div class="auth-bg">
            <div class="auth">
                <h2>Login</h2>
                <p class="err">{err().length > 0 && err()} </p>
                <div class="field-container">
                    <TextField label="Name" id="auth-name" placeholder="Enter name" type="text" value={form().name} onChange={e => setForm({ ...form(), name: e.target.value })} />
                </div>
                <div class="field-container">
                    <TextField label="Email" id="auth-email" placeholder="Enter Email" type="email" value={form().email} onChange={e => setForm({ ...form(), email: e.target.value })} />
                </div>
                <div class="field-container">
                    <TextField label="Password" id="auth-pass" placeholder="Enter Password" type="password" value={form().password} onChange={e => setForm({ ...form(), password: e.target.value })} />
                </div>
                <div class="field-container">
                    <TextField label="Password Confirm" id="auth-pass-2" placeholder="Enter Password Again" type="password" value={form().password2} onChange={e => setForm({ ...form(), password2: e.target.value })} />

                </div>
                <div>
                    <Link sx={{ textDecoration: "none" }} as={"a"} href="/login">Already have an account? Login here</Link>
                </div>
                <div>
                    <Button variant="contained" onclick={() => register()}>Register</Button>
                </div>
            </div>
        </div>
    )
}
