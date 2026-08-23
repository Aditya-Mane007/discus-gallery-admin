import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';
import React from 'react';

function page() {
  return (
    <PrivatePageLayout
      breadCrumbLinks={[
        { title: 'IAM', link: '/iam' },
        { title: 'Invitations', link: '/iam/invitations' },
      ]}
    >
      Invitations Page
      <PermissionAllowed permission="user-group:create">
        <Button>Create user group</Button>
      </PermissionAllowed>
    </PrivatePageLayout>
  );
}

export default page;
