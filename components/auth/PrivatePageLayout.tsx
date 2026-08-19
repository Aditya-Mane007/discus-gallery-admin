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
    <div className="flex flex-col h-full">
      <Header breadCrumbLinks={breadCrumbLinks} />

      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}

export default PrivatePageLayout;
