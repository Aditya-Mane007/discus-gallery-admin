import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>

      <p className="mt-2 text-muted-foreground">
        You don't have permission to access this page.
      </p>

      <Button className="my-4">
        <Link href={`${process.env.NEXT_PUBLIC_HOME_PAGE}`}>
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}
