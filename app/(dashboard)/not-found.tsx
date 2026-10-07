import Link from "next/link";
import { Placeholder } from "@/components/ui/page-header";

export default function NotFound() {
  return (
    <Placeholder>
      Страница не найдена.{" "}
      <Link href="/" className="text-accent hover:underline">
        На дашборд
      </Link>
    </Placeholder>
  );
}
