import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';
import React from 'react';

function page() {
  return (
    <PrivatePageLayout
      breadCrumbLinks={[
        { title: 'IAM', link: '/iam' },
        { title: 'Roles Groups', link: '/iam/role-groups' },
      ]}
    >
      Roles Groups Page
      <PermissionAllowed permission="user-groups:create">
        <Button>Create user group</Button>
      </PermissionAllowed>
    </PrivatePageLayout>
  );
}

export default page;
