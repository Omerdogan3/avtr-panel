import appRoutes from './appRoutes';

const userRoles = {
  "ADMIN": {
    pageAccess: [...appRoutes.map(el => el.id)]
  },
  "MARKETING": {
    pageAccess: ["dashboard", "trends"]
  },
  "MODERATOR": {
    pageAccess: ["dashboard"]
  },
  "TESTER": {
    pageAccess: ["dashboard"]
  },
  "NOT_AUTHORIZED": {
    pageAccess: ["dashboard"]
  }
}

export default userRoles;