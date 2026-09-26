import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';

import { ModuleListTableSection } from '@/components/tables/modules-table-section';

async function page() {
  return (
    <PrivatePageLayout breadCrumbLinks={[{ title: 'Home', link: '/' }]}>
      <PermissionAllowed permission="user:create">
        <Button>Create user</Button>
      </PermissionAllowed>

      <ModuleListTableSection />
    </PrivatePageLayout>
  );
}

export default page;
