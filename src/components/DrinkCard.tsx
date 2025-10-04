import React from "react";

export default function DrinkCard({
  title,
  type,
  description,
}: {
  title: string;
  type?: string;
  description?: string;
}) {
  return (
    <article className="w-full max-w-4xl mx-auto border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        {type ? <span className="text-sm text-neutral-500">{type}</span> : null}
      </div>
      {description ? <p className="mt-2 text-sm text-neutral-700">{description}</p> : null}
    </article>
  );
}
