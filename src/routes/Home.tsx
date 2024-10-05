import { redirect } from "@solidjs/router";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const [user, setUser] = useAuth(true);

    return (
        <div>Home</div>
    )
}
