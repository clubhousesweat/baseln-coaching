export type PageRoute =
  | '/'
  | '/coaching'
  | '/about'
  | '/field-notes'
  | '/online/register'
  | '/online/thank-you'
  | '/training-room'
  | '/member-login'
  | '/app'
  | '/coach'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/refund-policy'
  | '/training-disclaimer';

export interface NavItem {
  label: string;
  href: PageRoute;
}
