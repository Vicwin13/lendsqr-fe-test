"use client";

import Image from 'next/image';
import Link from 'next/link';
import { hashPassword } from '@/lib/hash';
import { saveUser } from '@/lib/auth';
import style from '../login/login.module.scss';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Signup() {
  const router = useRouter();

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleVisibility = () => {
    setShowPassword((prev)=> !prev);
  }

  const validFullname = (name: string) => name.trim().length >= 2;

  const validEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!validFullname(fullname)) {
      toast.error("Full name must be at least 2 characters long.");
      return;
    }

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

    const passwordHash = await hashPassword(password);

    saveUser({
      id: crypto.randomUUID(),
      fullname,
      email,
      token: passwordHash,
    });

    toast.success("Account created successfully! Please log in.");

    router.push("/login");
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
            <h1 className={style.welcome_text}>Join Lendsqr!</h1>
            <p className={style.details}>Create an account with Lendsqr</p>
          </div>

          <form onSubmit={handleSignup} className={style.form}>
            <input type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
            />
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

            {error && <p className={style.error}>{error}</p>}

            <button type="submit" disabled={loading}
            > {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className={style.signup_text}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
