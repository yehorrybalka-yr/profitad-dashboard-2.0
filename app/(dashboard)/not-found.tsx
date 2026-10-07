import Link from "next/link";
import { Placeholder } from "@/components/ui/page-header";

export default function NotFound() {
  return (
    <Placeholder>
      Страница не найдена.{" "}
      <Link href="/" className="font-semibold text-foreground hover:underline">
        На дашборд
      </Link>
    </Placeholder>
  );
}
