import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';

import { columns, Payment } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useQuery } from '@tanstack/react-query';
import { handleAPICall } from '@/lib/utils';
import { getOtpStatus } from '@/lib/services/authService';
import { getModuleListController } from '@/lib/services/moduleService';
import { QueryDataTable } from '@/components/data-table/QueryDataTable';
import { ModuleListTableSection } from '@/components/tables/modules-table-section';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function page({ searchParams }: PageProps) {
  // const data = await getData(searchParams);

  return (
    <PrivatePageLayout breadCrumbLinks={[{ title: 'Home', link: '/' }]}>
      <PermissionAllowed permission="user:create">
        <Button>Create user</Button>
      </PermissionAllowed>
      {/* <DataTable
        columns={columns}
        data={data}
        title="User Table"
        rowCount={100}
      /> */}
      {/* <QueryDataTable
        title="User Table"
        columns={columns}
        queryKey={['module-list']}
        queryFn={(params) => handleAPICall(params, getModuleListController)}
      /> */}
      <ModuleListTableSection />
    </PrivatePageLayout>
  );
}

export default page;
