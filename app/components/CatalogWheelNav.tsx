"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cercasProntas, gradilModels, soldadasHexagonais } from "../assets/data";
import { getProductAvatar } from "../assets/productAvatars";
import { useContentTranslation } from "./LanguageProvider";
import styles from "./CatalogWheelNav.module.css";

const meshGroup = (category: string) => soldadasHexagonais.filter(product => product.category === category).map(product => ({ name: product.name, href: `/soldadas-hexagonais/${product.slug}`, image: getProductAvatar(product.slug) }));
const fenceGroup = cercasProntas.map(product => ({ name: product.name, href: `/cercas-prontas/${product.slug}`, image: getProductAvatar(product.slug) }));
const accessories = [
  ["Catraca T7", "catraca-t7"], ["Catraca Micro", "catraca-micro"], ["Poste T", "poste-t"], ["Batedor de poste T", "batedor-manual"],
].map(([name, slug]) => ({ name, href: `/acessorios/${slug}`, image: getProductAvatar(name) }));
const groups = [
  { title: "Soldadas", items: meshGroup("Soldada") },
  { title: "Gradil", items: gradilModels.map(product => ({ name: product.name, href: `/gradil/${product.slug}`, image: getProductAvatar(product.slug) })) },
  { title: "Cercas Prontas", items: fenceGroup },
  { title: "Hexagonais", items: meshGroup("Hexagonal") },
  { title: "Simples torção", items: meshGroup("Torção Simples") },
  { title: "Acessórios", items: accessories },
];

export default function CatalogWheelNav({ page, onOpenChange }: { page: number; onOpenChange: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);

  const [previousPage, setPreviousPage] = useState(page);
  const id = useId();
  const translate = useContentTranslation();
  const reduce = useReducedMotion();
  const active = ({ 1: 0, 2: 1, 3: 2, 4: 2, 5: 2, 6: 3, 7: 4 } as Record<number, number>)[page] ?? 0;
  if (previousPage !== page) {
    setPreviousPage(page);
    setOpen(false);

  }
  const duration = reduce ? 0 : .45;
  const toggle = () => {
    setOpen(!open);

    onOpenChange(!open);
  };
  const visibleGroups = page === 0 ? groups : [groups[active]];
  const title = page === 0 ? "Todos os produtos" : groups[active].title;
  return (
    <motion.div className={styles.navigation} layout transition={{ duration, ease: [.22, 1, .36, 1] }}>
      <button type="button" className={styles.trigger} onClick={toggle} aria-expanded={open} aria-controls={id}>
        <motion.span className={styles.cover} animate={{ width: open ? 0 : 44, opacity: open ? 0 : 1, marginRight: open ? 0 : 14, filter: open ? "blur(8px)" : "blur(0px)" }} transition={{ duration }}>
          <Image src={groups[active].items[0]?.image ?? "/images/accessory-placeholder.svg"} alt="" width={44} height={44} />
        </motion.span>
        <span className={styles.heading}>
          <span>{translate(title)}</span>
          <motion.span className={styles.subtitle} animate={{ height: open ? 0 : "auto", opacity: open ? 0 : 1, filter: open ? "blur(6px)" : "blur(0px)" }} transition={{ duration }}>{translate("Conheça os produtos")}</motion.span>
        </span>
        <motion.span className={styles.chevron} animate={{ rotate: open ? 180 : 0 }} transition={{ duration }} aria-hidden="true">▾</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.nav id={id} aria-label={translate("Categorias do catálogo")} className={styles.menu}
          initial={{ height: 0, opacity: 0, filter: "blur(10px)" }} animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }} exit={{ height: 0, opacity: 0, filter: "blur(10px)" }} transition={{ duration }}>
          {visibleGroups.map((group, index) => <motion.div key={group.title} initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration, delay: reduce ? 0 : index * .045 }}>
            {page === 0 && <div className={`${styles.category} ${styles.active}`}>
              <span className={styles.avatar}><Image src={group.items[0]?.image ?? "/images/accessory-placeholder.svg"} alt="" fill sizes="44px" /></span>
              <span className={styles.categoryName}>{translate(group.title)}</span>
            </div>}
            {page !== 0 && <div className={styles.products}>
              {group.items.map((item, productIndex) => <motion.div key={item.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, delay: reduce ? 0 : productIndex * .025 }}>
                <Link href={item.href} className={styles.product}><span className={styles.productImage}><Image src={item.image} alt="" fill sizes="32px" /></span><span>{translate(item.name)}</span><span className={styles.arrow} aria-hidden="true">↗</span></Link>
              </motion.div>)}
            </div>}
          </motion.div>)}        </motion.nav>}
      </AnimatePresence>
    </motion.div>
  );
}