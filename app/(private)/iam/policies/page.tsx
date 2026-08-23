import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';

function page() {
  return (
    <PrivatePageLayout
      breadCrumbLinks={[
        { title: 'IAM', link: '/iam' },
        { title: 'Policies', link: '/iam/policies' },
      ]}
    >
      Policies Page
      <PermissionAllowed permission="user-groups:create">
        <Button>Create user group</Button>
      </PermissionAllowed>
    </PrivatePageLayout>
  );
}

export default page;
