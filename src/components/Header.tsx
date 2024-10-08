import { A } from "@solidjs/router";
import { Button } from "@suid/material";

export default function Header({ logout }: { logout: () => void }) {
    return (
        <header>
            <div class="logoContainer"><p>Encrypt</p></div>
            <ul class="linkContainer">
                <li><A href="/">Home</A></li>
                <li><A href="/account">Account</A></li>
            </ul>
            <div class="logoutContainer"><Button onClick={logout}>Logout</Button></div>
        </header>
    )
}
