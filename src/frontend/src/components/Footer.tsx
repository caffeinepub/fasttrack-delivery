import { Package } from "lucide-react";
import { SiFacebook, SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="bg-card border-t border-border mt-12"
      data-ocid="footer.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg text-foreground">
                TrackSwift
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Lightning-fast delivery tracking. Know exactly where your package
              is, every step of the way.
            </p>
          </div>

          {/* Links */}
          <div className="sm:text-center">
            <p className="font-semibold text-sm text-foreground mb-3">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {[
                "Track Package",
                "About Us",
                "Help Center",
                "Privacy Policy",
              ].map((link) => (
                <a
                  key={link}
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="footer.link"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="sm:text-right">
            <p className="font-semibold text-sm text-foreground mb-3">
              Follow Us
            </p>
            <div className="flex gap-3 sm:justify-end">
              {[
                { icon: SiX, label: "X" },
                { icon: SiFacebook, label: "Facebook" },
                { icon: SiGithub, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="/"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary flex items-center justify-center text-muted-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-4 text-right">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
