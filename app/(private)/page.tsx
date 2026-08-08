'use client';
import Header from '@/components/Header';
import LoadingScreen from '@/components/ui/LoadingScreen';
import useAuthQuery from '@/hooks/useAuthQuery';
import useGetPermissionQuery from '@/hooks/useGetPermissionQuery';

export default function Home() {
  const { user } = useAuthQuery();
  const { permissions } = useGetPermissionQuery();

  console.log(user);
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        breadCrumbLinks={[
          { title: 'Home', link: '' },
          { title: 'Products', link: '/dashboard' },
        ]}
      />
      {/* <LoadingScreen /> */}
    </div>
  );
}
