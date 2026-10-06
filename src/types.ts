export type PageRoute =
  | '/'
  | '/coaching'
  | '/about'
  | '/field-notes'
  | '/online/register'
  | '/training-room'
  | '/privacy'
  | '/terms'
  | '/refund-policy'
  | '/training-disclaimer';

export interface NavItem {
  label: string;
  href: PageRoute;
}
