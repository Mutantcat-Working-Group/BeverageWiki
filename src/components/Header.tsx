"use client";
import React from "react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <nav className="text-sm text-neutral-600 dark:text-neutral-300">
        <a className="mr-4 hover:underline" href="#">首页</a>
        <a className="mr-4 hover:underline" href="#">分类</a>
        <a className="hover:underline" href="#">关于</a>
      </nav>
    </header>
  );
}
