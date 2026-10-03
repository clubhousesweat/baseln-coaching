export type PageRoute =
  | '/'
  | '/coaching'
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
