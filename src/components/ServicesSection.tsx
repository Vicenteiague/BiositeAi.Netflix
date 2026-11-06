import type { BiositeLink } from "../data/conectacard";

interface ServicesSectionProps {
  title: string;
  text?: string;
  items: BiositeLink[];
  onOpenInfo: (title: string, desc: string, isService?: boolean) => void;
}

export function ServicesSection({ title, text, items, onOpenInfo }: ServicesSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="servicos" aria-label={title}>
      <h2 className="servicos-titulo">{title}</h2>
      {text && <p className="servicos-texto">{text}</p>}
      <div className="servicos-grid">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url || "#"}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!item.url) {
                e.preventDefault();
                onOpenInfo(
                  item.title,
                  "A página deste serviço está em desenvolvimento pela Start Mkt Local. Gostaria de falar conosco no WhatsApp para solicitar uma proposta ou orçamento personalizado?",
                  true
                );
              }
            }}
            aria-label={item.title}
            className="link-card servico-card group"
          >
            <div className="link-image">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="group-hover:scale-105 transition-transform duration-350"
              />
            </div>
            <div className="link-caption">
              <span>{item.title}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
