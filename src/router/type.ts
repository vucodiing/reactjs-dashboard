import type { SvgIconComponent } from '@mui/icons-material';
export interface IRoute {
  path?: string;
  name?: string;
  element?: React.ComponentType;
  index?: boolean;
  protected?: boolean;
  icon?: SvgIconComponent;
  children?: IRoute[];
  meta?: {
    [key: string]: string | number | boolean | string[];
  };
}
