import { ArrowUpRight } from "lucide-react";
import type { BiositeLink } from "../data/conectacard";

interface LinksGridProps {
  title: string;
  links: BiositeLink[];
  onOpenInfo: (title: string, desc: string) => void;
}

export function LinksGrid({ title, links, onOpenInfo }: LinksGridProps) {
  if (!links || links.length === 0) return null;

  return (
    <div>
      {title && <h2 className="links-titulo">{title}</h2>}
      <section className="links-grid" aria-label="Contatos e redes sociais">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url || "#"}
            target={link.url ? "_blank" : undefined}
            rel={link.url ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!link.url) {
                e.preventDefault();
                onOpenInfo(link.title, "Este contato ainda não foi disponibilizado pela empresa.");
              }
            }}
            aria-label={link.title}
            className="link-card group"
          >
            <div className="link-image">
              <img
                src={link.image}
                alt=""
                loading="lazy"
                className="group-hover:scale-105 transition-transform duration-350"
              />
            </div>
            <div className="link-caption">
              <span>{link.title}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
