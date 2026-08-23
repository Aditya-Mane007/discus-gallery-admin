import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        You Don't Have Access to This Page
      </h2>

      <p className="md:w-[50%] text-center mt-2 text-muted-foreground">
        This page requires permissions your account doesn't currently have.
        Reach out to your administrator if you think you should have access.
      </p>

      <Button className="my-4">
        <Link href={`${process.env.NEXT_PUBLIC_HOME_PAGE}`}>
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}
