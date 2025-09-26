"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LayoutDashboard, PencilRuler } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Interviewee", icon: PencilRuler },
    { href: "/dashboard", label: "Interviewer", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
          <span className="hidden font-bold sm:inline-block">AI Interview Assistant</span>
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "transition-colors",
                pathname === item.href
                  ? "text-primary hover:text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline-block">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
