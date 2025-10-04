"use client";
import React from "react";
import { I18nProvider } from "../i18n/Provider";

export default function I18nClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nProvider>{children}</I18nProvider>;
}
