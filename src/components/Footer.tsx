import { formatPhone } from "../utils/format";

interface FooterProps {
  footerText: string;
  local: string;
  telefone: string;
  email: string;
}

export function Footer({ footerText, local, telefone, email }: FooterProps) {
  const cleanPhone = telefone.replace(/\D/g, "");

  return (
    <footer className="mt-12 mb-20 md:mb-10 pt-8 pb-6 border-t border-[#222222] text-center text-xs text-[#737373] px-4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="font-netflix text-xl text-[#E50914] font-black">N</span>
        <span className="font-netflix text-sm tracking-wider text-white">CONECTAFLIX</span>
        <span className="text-[#444]">·</span>
        <span>{footerText}</span>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-[11px] text-[#888888]">
        <p>{local}</p>
        <div className="flex items-center justify-center gap-4 mt-1 flex-wrap">
          {cleanPhone && (
            <a
              href={`https://wa.me/55${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#E50914] transition-colors font-medium"
            >
              WhatsApp: {formatPhone(telefone)}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-[#a3a3a3] hover:text-[#E50914] transition-colors"
            >
              {email}
            </a>
          )}
        </div>
        <p className="text-[10px] text-[#555] mt-2">
          © 2026 Conectacard NFC · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
