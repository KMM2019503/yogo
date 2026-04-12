import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={"/yogo-logo.jpeg"}
            alt="YoGo logo"
            width={88}
            height={88}
            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
              Patient Dashboard
            </p>
            <p className="max-w-[34vw] truncate text-sm font-semibold text-slate-900 sm:max-w-none">
              Hello, {user.name}
            </p>
          </div>
        </Link>

        <Button
          asChild
          variant="outline"
          className="h-9 rounded-xl border-slate-300 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 sm:text-sm"
        >
          <Link href="/">Switch Account</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
