import React from 'react';

function page() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Access Not Yet Provisioned
      </h2>

      <p className="md:w-[50%] text-center mt-2 text-muted-foreground">
        Your login was successful, but your account currently has no assigned
        roles or permissions. Please contact your system administrator to
        request the appropriate access.
      </p>
    </div>
  );
}

export default page;
