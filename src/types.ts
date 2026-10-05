export type PageRoute =
  | '/'
  | '/coaching'
  | '/about'
  | '/field-notes'
  | '/apply'
  | '/training-room'
  | '/privacy'
  | '/terms'
  | '/refund-policy'
  | '/training-disclaimer';

export interface NavItem {
  label: string;
  href: PageRoute;
}
