export type PageRoute = 
  | '/'
  | '/coaching'
  | '/how-it-works'
  | '/about'
  | '/field-notes'
  | '/apply'
  | '/training-room'
  | '/privacy'
  | '/terms';

export interface NavItem {
  label: string;
  href: PageRoute;
}
