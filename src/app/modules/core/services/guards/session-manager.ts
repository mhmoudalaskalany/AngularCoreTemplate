import { TokenData, RouteData, Permission, PermissionResult, Action, RoleData } from './models';
import { User } from 'oidc-client';
import { Storage } from '../storage/storage';

export class SessionManager {
  /* private fields */
  private static instance: SessionManager;
  public permissions: PermissionResult[] = [];
  public appPermissions: PermissionResult = {};
  /* public fields */
  public tokenData: TokenData | null = null;
  public IsLoggedIn = false;

  public static Current(): SessionManager {
    if (this.instance == null) {
      this.instance = new SessionManager();
      this.instance.CheckToken();
    }
    return this.instance;
  }
  public GetToken(): TokenData | null {
    if (this.tokenData && this.tokenData.IsExpired()) {
      return null;
    }

    return this.tokenData;
  }

  public GetRole(): RoleData {
    const permissionList = JSON.parse(sessionStorage.getItem('Permissions')) as PermissionResult;
    const role = Object.assign(new RoleData(), {
      roleName: permissionList.RoleName,
      roleId: permissionList.RoleId,
      appId: permissionList.AppId
    });
    return role;
  }

  public StartSession(user?: User) {
    this.MapPermissions(user);
    this.tokenData = Object.assign(new TokenData(), {
      Token: user.access_token,
      Expiry: user.expires_in
    });
    sessionStorage.setItem('TokenData', JSON.stringify(this.tokenData));
    sessionStorage.setItem('token', user.access_token);
  }

  public EndSession() {
    this.tokenData = null;
  }
  public GetPermission(id: string | Action): string {

    const permissionList = JSON.parse(sessionStorage.getItem('Permissions')) as PermissionResult;
    const permission = permissionList.Permissions.find(x => x === id);
    return permission;
  }
  public GetPagePermission(page: string): string[] {

    const permissionList = JSON.parse(sessionStorage.getItem('Permissions')) as PermissionResult;
    const permissions = permissionList.Permissions.filter(x => x.includes(page));
    return permissions;
  }
  public IsAuthorized(data: RouteData): boolean {
    if (data.IsAnonymous) {
      return true;
    }
    if (data.AllowAll) {
      return true;
    }
    const p = this.GetPermission(data.permission);
    console.log('permission at ia authorized', p);
    if (p) {
      return true;
    }
    return false;
  }


  private MapPermissions(user?: User) {
    this.permissions = JSON.parse(user.profile.permissions);
    const appPermission = this.permissions.find(x => x.AppName === 'Users');
    this.appPermissions = appPermission;
    sessionStorage.setItem('Permissions', JSON.stringify(appPermission));
  }

  private CheckToken(): void {
    this.tokenData = Storage.GetFromSession('TokenData', TokenData);
    if (this.tokenData == null) {
      this.IsLoggedIn = false;
    } else {
      const token = this.tokenData as TokenData;
      this.IsLoggedIn = new Date() < new Date(token.Expiry);
    }
  }

}
