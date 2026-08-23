export const OTP_TYPE = {
  LOGIN_VERIFICATION_OTP: 'LOGIN_VERIFICATION_OTP',
};

export const routePermissions = [
  {
    url: '/iam/users',
    permission: 'user:read',
  },
  {
    url: '/iam/user-groups',
    permission: 'user-group:read',
  },
  {
    url: '/iam/roles',
    permission: 'role:read',
  },
  {
    url: '/iam/role-groups',
    permission: 'role-group:read',
  },
  {
    url: '/iam/policies',
    permission: 'policy:read',
  },
  {
    url: '/iam/organizations',
    permission: 'organization:read',
  },
  {
    url: '/iam/memberships',
    permission: 'membership:read',
  },
  {
    url: '/iam/invitations',
    permission: 'invitation:read',
  },
  {
    url: '/iam/session',
    permission: 'session:read',
  },
];
