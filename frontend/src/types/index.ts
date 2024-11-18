export interface Feature {
  title: string;
  description: string;
}

export interface RouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
