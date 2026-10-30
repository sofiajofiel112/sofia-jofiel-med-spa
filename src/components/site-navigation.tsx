import { Link } from "@tanstack/react-router";

const navigationItems = [
  { label: "Home", href: "/", type: "route" },
  { label: "Services", href: "/services", type: "route" },
  { label: "Treatments", href: "#treatments", type: "section" },
  { label: "Gallery", href: "#gallery", type: "section" },
  { label: "About", href: "#about", type: "section" },
  { label: "Philosophy", href: "#philosophy", type: "section" },
  { label: "Contact", href: "#contact", type: "section" },
] as const;

type SiteNavigationProps = {
  currentPage: "home" | "services";
  mobile?: boolean;
  onNavigate?: () => void;
};

export function SiteNavigation({ currentPage, mobile = false, onNavigate }: SiteNavigationProps) {
  const navClassName = mobile
    ? currentPage === "services"
      ? "site-nav-mobile site-nav-mobile--services border-t border-white/10 bg-[#090806] px-5 py-4 lg:hidden"
      : "site-nav-mobile site-nav-mobile--home border-t border-border bg-background px-5 py-6 lg:hidden"
    : currentPage === "services"
      ? "site-nav-desktop site-nav-desktop--services"
      : "site-nav-desktop site-nav-desktop--home";

  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={navClassName}>
      {navigationItems.map((item) => {
        const isCurrentPage = item.href === `/${currentPage === "home" ? "" : "services"}`;
        const className = mobile
          ? currentPage === "services"
            ? `services-mobile-link${isCurrentPage ? " text-gold" : ""}`
            : "block border-b border-border py-4 font-display text-2xl"
          : currentPage === "services"
            ? `services-nav-link${isCurrentPage ? " services-nav-active" : ""}`
            : "text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-gold";
        const commonProps = {
          className,
          onClick: onNavigate,
          ...(isCurrentPage && currentPage === "services" ? { "aria-current": "page" as const } : {}),
        };

        if (item.type === "route") {
          return (
            <Link key={item.label} to={item.href} {...commonProps}>
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            href={currentPage === "services" ? `/${item.href}` : item.href}
            {...commonProps}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
