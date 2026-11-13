import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <div className="container-x">
        <p className="eyebrow">404</p>
        <h1 className="h-hero mt-4 text-ink">
          Out of <span className="text-flare">bounds.</span>
        </h1>
        <p className="lead mt-6 max-w-lg">This page isn&apos;t on the court. Let&apos;s get you back in the game.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/#sports" variant="outline">
            Explore sports
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
