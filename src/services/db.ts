import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";
import { allClients } from "../data/clients";
import { conectacardData, type BiositeData, type CatalogoItem, type BiositeLink } from "../data/conectacard";

export interface CompanyDoc {
  id: string;
  name: string;
  slug: string;
  bio: string;
  bannerUrl: string;
  avatarUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  instagram?: string;
  website?: string;
  googleReviewUrl?: string;
  googleMapsUrl?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
  netflix?: {
    lettermark?: string;
    headline?: string;
    subheadline?: string;
    genres?: string[];
    matchPercent?: number;
    seasonText?: string;
    tagline?: string;
  };
}

export interface LiaConfigDoc {
  companyId: string;
  greeting?: string;
  knowledge?: string;
  humanFallbackWhatsapp?: string;
  rules?: string;
}

/**
 * Fetch company by its unique slug from Firestore.
 * Falls back gracefully to local client data if Firestore document is not yet found.
 */
export async function getCompanyBySlug(slug: string): Promise<BiositeData> {
  const localFallback = allClients[slug] || conectacardData;

  try {
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return localFallback;
    }

    const docSnap = snapshot.docs[0];
    const compData = docSnap.data() as CompanyDoc;
    const companyId = docSnap.id;

    // Fetch subcollections in parallel
    const [productsSnap, servicesSnap, linksSnap, liaSnap] = await Promise.all([
      getDocs(collection(db, "companies", companyId, "products")).catch(() => null),
      getDocs(collection(db, "companies", companyId, "services")).catch(() => null),
      getDocs(collection(db, "companies", companyId, "links")).catch(() => null),
      getDoc(doc(db, "companies", companyId, "lia_config", "main")).catch(() => null),
    ]);

    const items: CatalogoItem[] = productsSnap && !productsSnap.empty
      ? productsSnap.docs.map((d) => {
          const dData = d.data();
          return {
            id: d.id,
            title: dData.title || "",
            image: dData.image || "",
            price: dData.price,
            description: dData.description,
          };
        })
      : localFallback.catalogo?.items || [];

    const serviceItems: BiositeLink[] = servicesSnap && !servicesSnap.empty
      ? servicesSnap.docs.map((d) => {
          const dData = d.data();
          return {
            id: d.id,
            title: dData.title || "",
            image: dData.image || "",
            url: dData.url || null,
          };
        })
      : localFallback.servicos?.items || [];

    const linkItems: BiositeLink[] = linksSnap && !linksSnap.empty
      ? linksSnap.docs.map((d) => {
          const dData = d.data();
          return {
            id: d.id,
            title: dData.title || "",
            image: dData.image || "",
            url: dData.url || null,
          };
        })
      : localFallback.links || [];

    const liaData = liaSnap && liaSnap.exists() ? (liaSnap.data() as LiaConfigDoc) : null;

    // Compose final BiositeData
    return {
      slug: compData.slug || slug,
      name: compData.name || localFallback.name,
      bio: compData.bio || localFallback.bio,
      banner: {
        src: compData.bannerUrl || localFallback.banner.src,
        alt: compData.name || localFallback.banner.alt,
      },
      avatar: {
        src: compData.avatarUrl || localFallback.avatar.src,
        alt: compData.name || localFallback.avatar.alt,
      },
      video: localFallback.video,
      produtos: localFallback.produtos,
      catalogo: {
        title: localFallback.catalogo?.title || "Produtos",
        items,
      },
      linksTitulo: localFallback.linksTitulo,
      links: linkItems,
      servicos: serviceItems.length > 0 ? {
        title: localFallback.servicos?.title || "Nossos Serviços",
        text: localFallback.servicos?.text || "",
        items: serviceItems,
      } : localFallback.servicos,
      mapa: localFallback.mapa,
      contato: {
        local: compData.address || localFallback.contato.local,
        telefone: compData.whatsapp || compData.phone || localFallback.contato.telefone,
        email: compData.email || localFallback.contato.email,
      },
      footer: localFallback.footer,
      atendimento: {
        saudacao: liaData?.greeting || localFallback.atendimento.saudacao,
        conhecimento: liaData?.knowledge || localFallback.atendimento.conhecimento,
        empresa: localFallback.atendimento.empresa,
        produtos: localFallback.atendimento.produtos,
      },
      netflix: compData.netflix || localFallback.netflix,
      seo: localFallback.seo,
    };
  } catch (err) {
    console.warn("Could not fetch company from Firestore, using fallback:", err);
    return localFallback;
  }
}

/**
 * Seed initial sample companies into Firestore if the companies collection is empty.
 * This guarantees the database has immediate multiempresa records.
 */
export async function seedInitialCompaniesIfEmpty(): Promise<void> {
  try {
    const companiesRef = collection(db, "companies");
    const snapshot = await getDocs(companiesRef);

    if (!snapshot.empty) {
      return; // Already seeded
    }

    // Seed default companies from clients.ts
    const seedSlugs = ["start-mkt-local", "superlimpo", "pizzaria", "farmacia"];

    for (const slug of seedSlugs) {
      const c = allClients[slug];
      if (!c) continue;

      const compId = slug;
      const compDocRef = doc(db, "companies", compId);

      await setDoc(compDocRef, {
        id: compId,
        slug: c.slug,
        name: c.name,
        bio: c.bio,
        bannerUrl: c.banner.src,
        avatarUrl: c.avatar.src,
        phone: c.contato.telefone,
        whatsapp: c.contato.telefone,
        email: c.contato.email,
        address: c.contato.local,
        openingHours: "Segunda a Sexta, das 08h às 18h | Sábado, das 08h às 12h",
        netflix: c.netflix || null,
        createdAt: new Date().toISOString(),
      });

      // Seed Links subcollection
      if (c.links && c.links.length > 0) {
        for (const link of c.links) {
          const linkRef = doc(db, "companies", compId, "links", link.id);
          await setDoc(linkRef, {
            id: link.id,
            companyId: compId,
            title: link.title,
            image: link.image,
            url: link.url,
          });
        }
      }

      // Seed Products subcollection
      if (c.catalogo?.items && c.catalogo.items.length > 0) {
        for (const prod of c.catalogo.items) {
          const prodRef = doc(db, "companies", compId, "products", prod.id);
          await setDoc(prodRef, {
            id: prod.id,
            companyId: compId,
            title: prod.title,
            image: prod.image,
            price: prod.price || "",
            description: prod.description || "",
            isAvailable: true,
          });
        }
      }

      // Seed Services subcollection
      if (c.servicos?.items && c.servicos.items.length > 0) {
        for (const serv of c.servicos.items) {
          const servRef = doc(db, "companies", compId, "services", serv.id);
          await setDoc(servRef, {
            id: serv.id,
            companyId: compId,
            title: serv.title,
            image: serv.image,
            url: serv.url,
            isAvailable: true,
          });
        }
      }

      // Seed LIA config
      const liaRef = doc(db, "companies", compId, "lia_config", "main");
      await setDoc(liaRef, {
        companyId: compId,
        greeting: c.atendimento.saudacao,
        knowledge: c.atendimento.conhecimento,
        humanFallbackWhatsapp: c.contato.telefone,
        rules: "Responda apenas com base nos fatos da empresa. Se não souber, encaminhe para atendimento humano.",
      });
    }

    console.log("Initial Firestore companies seeded successfully.");
  } catch (err) {
    // If permission or network restriction happens during unauthenticated initial boot, log warning and let app run
    console.warn("Seeding notice:", err);
  }
}

/**
 * Save chat conversation message to Firestore
 */
export async function saveMessageToFirestore(
  companyId: string,
  conversationId: string,
  role: "user" | "assistant",
  text: string
): Promise<void> {
  try {
    const msgRef = collection(
      db,
      "companies",
      companyId,
      "conversations",
      conversationId,
      "messages"
    );
    await addDoc(msgRef, {
      role,
      text,
      createdAt: new Date().toISOString(),
    });
  } catch {
    // Non-blocking log
  }
}
