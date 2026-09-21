import React from 'react';
import Header from '../Header';

type PrivatePageLayoutProps = {
  breadCrumbLinks: {
    title: string;
    link: string;
  }[];
  children: React.ReactNode;
};

function PrivatePageLayout({
  children,
  breadCrumbLinks,
}: PrivatePageLayoutProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <Header breadCrumbLinks={breadCrumbLinks} />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default PrivatePageLayout;
