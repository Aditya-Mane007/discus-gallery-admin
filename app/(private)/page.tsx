import PermissionAllowed from '@/components/auth/PermissionAllowed';
import PrivatePageLayout from '@/components/auth/PrivatePageLayout';
import { Button } from '@/components/ui/button';

import { columns, Payment } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
async function getData(): Promise<Payment[]> {
  console.log('DATA FETCHED');
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'a@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'b@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'c@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },

    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
    },
  ];
}

async function page() {
  const data = await getData();

  return (
    <PrivatePageLayout breadCrumbLinks={[{ title: 'Home', link: '/' }]}>
      <PermissionAllowed permission="user:create">
        <Button>Create user</Button>
      </PermissionAllowed>
      <DataTable columns={columns} data={data} title="User Table" />
    </PrivatePageLayout>
  );
}

export default page;
