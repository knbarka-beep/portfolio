import Link from "next/link";

type Props = { title: string; text: string; back: string; href: string };

export function NotFoundBody({ title, text, back, href }: Props) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1080px] flex-col justify-center px-4 py-24 sm:px-6">
      <p className="text-[15px] font-medium text-muted">404</p>
      <h1 className="mt-2 text-[44px] font-semibold sm:text-[64px]">{title}</h1>
      <p className="mt-3 text-[21px] text-muted">{text}</p>
      <div className="mt-8">
        <Link href={href} className="pill pill-primary">
          {back}
        </Link>
      </div>
    </section>
  );
}
