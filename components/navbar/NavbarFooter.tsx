/** @format */

async function NavbarFooter() {
  "use cache";

  return (
    <footer className="brutal-border border-x-0 border-b-0 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <p className="font-heading text-sm font-bold">
          WADIFA_ © {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-background/60">
          BUILT WITH BRUTAL HONESTY
        </p>
      </div>
    </footer>
  );
}

export default NavbarFooter;
