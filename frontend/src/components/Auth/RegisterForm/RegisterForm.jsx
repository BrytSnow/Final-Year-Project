import "./RegisterForm.css";
import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { registerUser } from "../../../firebase/auth";
import GoogleButton from "../GoogleButton/GoogleButton";

export default function RegisterForm() {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const passwordStrength = () => {
        if (!password) return "";
        if (password.length < 6) return "Weak";
        if (password.length < 10) return "Medium";
        return "Strong";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await registerUser(
                email,
                password,
                displayName
            );

            alert(
                "Account created successfully!\n\nA verification email has been sent to your inbox.\nPlease verify your email before signing in."
            );

            setDisplayName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-form">

            <h2>Create Account</h2>

            <p>Start using AI-powered disease detection</p>

            <GoogleButton />

            <div className="divider">
                <span>OR</span>
            </div>

            <form onSubmit={handleRegister}>

                <div className="input-group">
                    <FiUser />
                    <input
                        type="text"
                        placeholder="Full name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiMail />
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiLock />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {password && (
                    <div className="password-strength">
                        Password strength:
                        <span className={passwordStrength()}>
                            {passwordStrength()}
                        </span>
                    </div>
                )}

                <div className="input-group">
                    <FiLock />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Create Account
                </button>

            </form>

            <p className="switch-auth">
                Already have an account?
                <a href="/">Login</a>
            </p>

        </div>
    );

}