import { ColumnsInterface } from './columns.interface';
import { ActionsInterface } from './actions.interface';
import { URL } from './url';
export class TableOptions {
  inputCols?: ColumnsInterface[] = [];
  inputActions?: ActionsInterface[] = [];
  inputUrl?: URL = {};
  inputPermissions?: string[] = [];
  inputName?: string;
  nonSuperAdminRoleId ?= 0;
}
