"use client";

import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { hashPassword } from '@/lib/hash';
import style from './login.module.scss';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);


    const toggleVisibility = () => {
    setShowPassword((prev)=> !prev);
  }



  const validEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!validEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validPassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character."
      );
      return;
    }

    const storedUser = getUser();
    if (!storedUser) {
      toast.error("No account found. Please sign up.");
      return;
    }

    const passwordHash = await hashPassword(password);

    if (storedUser.email === email && storedUser.token === passwordHash) {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      router.push("/dashboard"); 
    } else {
      toast.error("Invalid email or password.");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.first_div}>
        <Image src="/Group.svg" alt="Lendsqr Logo" width={100} height={100} className={style.logo} />
        <Image src="/pablo-sign-in1.svg" alt="Illustration" width={600} height={337.6} className={style.illustration} />
      </div>

      <div className={style.second_div}>
        <div className={style.form_div}>
          <div>
            <h1 className={style.welcome_text}>Welcome!</h1>
            <p className={style.details}>Enter your details to Login</p>
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          <div className={style.password_container}>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              />
            <button
              type='button'
              onClick={toggleVisibility}
              className={style.show_password}
              aria-label={showPassword ? "Hide password" : "Show password"}
              >
              {showPassword ? "hide": "show"}
            </button>
              </div>

            <p className={style.forgot}>Forgot Password</p>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          <p className={style.signup_text}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
