export function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:NFC;Conectacard;Cartão;;
FN:Conectacard Cartão NFC
ORG:Start Mkt Local
TITLE:Cartão NFC Inteligente & Marketing Digital
TEL;TYPE=CELL,VOICE,pref:+5567993174612
EMAIL:startmktlocal@gmail.com
URL:https://www.startmktlocal.com.br
ADR;TYPE=WORK:;;Ponta Porã;MS;;Brasil
NOTE:Conectacard – Seu Cartão NFC Infinito. Compartilhe contatos, localização e redes sociais com um toque.
END:VCARD`;

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Conectacard-StartMktLocal.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
