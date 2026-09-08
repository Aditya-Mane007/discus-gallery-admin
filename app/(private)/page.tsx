import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';
import React from 'react';
import DataTable from '@/components/data-table/DataTable';

function page() {
  return (
    <PrivatePageLayout breadCrumbLinks={[{ title: 'Home', link: '/' }]}>
      {/* Home Page
      <PermissionAllowed permission="user:create">
        <Button>Create user</Button>
      </PermissionAllowed> */}
      <DataTable />
    </PrivatePageLayout>
  );
}

export default page;
