"use client";

import Link from "next/link";

function HomePage() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content w-full flex-col text-center">
        <h1 className="text-5xl font-bold">Friendly Macros</h1>
        <p className="w-full py-6">
          Discover your favorite restaurants, customize your meals with macros
          <br />
          and more, and share with friends for future cravings - Experience
          <br />
          the ultimate dining convenience with Friendly Macros!
        </p>
        <div className="flex gap-6">
          <Link href={`/log-in`}>
            <button className="btn-outline btn-primary btn-wide btn">
              Log in
            </button>
          </Link>
          <Link href={`/register`}>
            <button className="btn-primary btn-wide btn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
