import { Home, Link2, Briefcase, ShoppingBag, Bot } from "lucide-react";
import { playNetflixTaDum } from "../utils/audio";

interface NetflixBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function NetflixBottomNav({ activeTab, onTabChange }: NetflixBottomNavProps) {
  const tabs = [
    { id: "inicio", label: "Início", icon: Home },
    { id: "links", label: "Links", icon: Link2 },
    { id: "servicos", label: "Serviços", icon: Briefcase },
    { id: "produtos", label: "Produtos", icon: ShoppingBag },
    { id: "lia", label: "LIA IA", icon: Bot },
  ];

  const handleTabClick = (tabId: string) => {
    playNetflixTaDum();
    onTabChange(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#121212]/95 backdrop-blur-lg border-t border-[#262626] py-1.5 px-2 select-none shadow-[0_-4px_20px_rgba(0,0,0,0.8)]"
      aria-label="Navegação móvel estilo Netflix"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-all group ${
                isActive ? "text-[#E50914]" : "text-[#737373] hover:text-white"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? "stroke-[2.5px]" : "stroke-[1.75px]"
                  }`}
                />
                {tab.id === "lia" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight font-medium ${
                  isActive ? "text-white font-bold" : "text-[#888888]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
