import { useEffect } from "react";



function OAuth() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if(token) {
            localStorage.setItem("token", token);
            window.dispatchEvent(new Event("tenchi-authenticated"));
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    function handleGoogleLogin() {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }
    return null;
}

export default OAuth