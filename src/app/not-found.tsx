import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold text-primary">404 — Page not found</h1>
      <p className="text-neutral-4">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/boards/sport-xi"
        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Go to default board
      </Link>
    </div>
  );
};

export default NotFound;
