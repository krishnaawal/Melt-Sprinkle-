"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock3, Leaf, Menu, Minus, Plus, ShieldCheck, Sparkles, Star, Truck, X, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PRODUCT = { name: "Cheese Powder Pop Corn Seasoning Blast", price: 114, original: 125, weight: "100g" };

function Brand() {
  return <Link href="/" className="brand" aria-label="Melt & Sprinkle home"><span className="brand-mark">M</span><span><strong>Melt</strong><em>&</em><strong>Sprinkle</strong><small>snack rituals, made better</small></span></Link>;
}

function Qty({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  return <div className="qty" aria-label="Quantity selector"><button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}><Minus size={15} /></button><span>{value}</span><button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)}><Plus size={15} /></button></div>;
}

function ProductVisual({ back = false, size = "large" }: { back?: boolean; size?: "large" | "small" }) {
  return <div className={`product-visual ${size}`}><div className="visual-glow" /><Image src={back ? "/product/cheese-seasoning-back.png" : "/product/cheese-seasoning-front.png"} alt={`${PRODUCT.name} pack`} fill sizes={size === "large" ? "(max-width: 900px) 86vw, 45vw" : "180px"} className="product-pack" priority={!back} /></div>;
}

const benefits = [
  ["01", "Rich cheese flavour", "A golden, savoury finish for every bite."],
  ["02", "Sprinkle & serve", "No prep, no pan — just shake and share."],
  ["03", "Made for more", "Popcorn, fries, pasta, salads and more."],
  ["04", "Pocket-friendly pack", "A neat 100g pouch for your snack shelf."],
];

const uses = ["Popcorn", "Fries", "Pasta", "Salad", "Pretzels", "Baked potatoes"];

export default function Home() {
  const [qty, setQty] = useState(1);
  const [menu, setMenu] = useState(false);
  return <main>
    <div className="announcement"><span><Sparkles size={14} /> Small pack, big snack energy</span><span className="announcement-hide">Cash on delivery available across supported areas in Nepal</span><Link href="/checkout">Order your pack <ArrowRight size={14} /></Link></div>
    <header className="site-header"><div className="container header-inner"><Brand /><nav className={menu ? "nav open" : "nav"}><a href="#product" onClick={() => setMenu(false)}>Product</a><a href="#benefits" onClick={() => setMenu(false)}>Why it works</a><a href="#how" onClick={() => setMenu(false)}>How to use</a><Link className="nav-cta" href="/checkout">Order now <ArrowRight size={15} /></Link></nav><button className="menu-toggle" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></header>

    <section className="hero" id="product"><div className="grain" /><div className="container hero-grid"><motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><div className="eyebrow"><span className="eyebrow-dot" /> Himalaya Great Foods <span className="eyebrow-line" /> 100g</div><h1>Make every snack<br /><span>worth sharing.</span></h1><p className="hero-lede">A rich, cheesy sprinkle that turns everyday popcorn, fries, pasta and more into your favourite part of the day.</p><div className="price-line"><strong>Rs. {PRODUCT.price}</strong><del>Rs. {PRODUCT.original}</del><span>9% off</span></div><div className="urgency"><Clock3 size={15} /> Almost sold out — order now</div><div className="hero-actions"><Qty value={qty} onChange={setQty} /><Link href={`/checkout?quantity=${qty}`} className="button primary">Order now <ArrowRight size={17} /></Link></div><div className="trust-row"><span><ShieldCheck size={16} /> COD available</span><span><Truck size={16} /> Easy returns</span><span><Zap size={16} /> Quick confirmation</span></div></motion.div><motion.div className="hero-art" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }}><div className="burst">GOOD<br /><b>VIBES</b><br />ONLY</div><ProductVisual /><div className="art-caption"><span className="caption-line" /> <span>Cheese seasoning<br /><b>made for good times.</b></span></div></motion.div></div></section>

    <section className="proof-strip"><div className="container proof-inner"><div><span className="stars">★★★★★</span><strong>94%</strong><small>positive seller rating</small></div><div><strong>100%</strong><small>ship-on-time reference</small></div><div><Leaf size={22} /><strong>Made to share</strong><small>with your everyday snacks</small></div><div><ShieldCheck size={22} /><strong>Simple & transparent</strong><small>clear product information</small></div></div></section>

    <section className="benefits-section" id="benefits"><div className="container"><div className="section-intro"><div><div className="eyebrow">THE GOOD STUFF</div><h2>The easiest way to<br /><span>level up a snack.</span></h2></div><p>Designed for spontaneous cravings and slow afternoons. One shake is all it takes to bring a warm, savoury cheese note to the table.</p></div><div className="benefit-grid">{benefits.map(([num, title, copy], index) => <motion.article key={title} className={`benefit-card card-${index + 1}`} whileHover={{ y: -5 }} transition={{ duration: .2 }}><span className="benefit-num">{num}</span><div className="benefit-icon">{index === 0 ? <Sparkles /> : index === 1 ? <Zap /> : index === 2 ? <Leaf /> : <ShieldCheck />}</div><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></div></section>

    <section className="how-section" id="how"><div className="container how-grid"><div className="how-copy"><div className="eyebrow">THREE STEPS TO HAPPY</div><h2>From plain to<br /><span>oh, wow.</span></h2><p>Keep it close for the moments that call for a little extra. There is no wrong way to sprinkle.</p><div className="steps"><div><b>01</b><span><strong>Prepare your favourite snack</strong><small>Pop, fry, boil or bake — your call.</small></span></div><div><b>02</b><span><strong>Sprinkle the good stuff</strong><small>Start light, then add more to taste.</small></span></div><div><b>03</b><span><strong>Mix well & enjoy</strong><small>Best served warm, shared freely.</small></span></div></div></div><div className="snack-board"><div className="board-circle circle-one" /><div className="board-circle circle-two" /><div className="snack-note"><Star size={15} fill="currentColor" /> snack shelf essential</div>{uses.map((use, i) => <div key={use} className={`snack-chip chip-${i}`}><span>{["🍿", "🍟", "🍝", "🥗", "🥨", "🥔"][i]}</span>{use}</div>)}<div className="board-center">melt<br /><em>&</em><br />sprinkle</div></div></div></section>

    <section className="details-section"><div className="container details-grid"><div><div className="eyebrow">WHAT&apos;S INSIDE</div><h2>Cheese,<br /><span>with a little magic.</span></h2><p className="muted">A compact seasoning pouch with a bold, cheesy profile — ready for popcorn, fries, pasta, salads, pretzels and baked potatoes.</p><div className="detail-list"><div><span>Brand</span><strong>Himalaya Great Foods</strong></div><div><span>Product</span><strong>Cheese Powder Pop Corn Seasoning Blast</strong></div><div><span>Pack size</span><strong>1 × 100g pouch</strong></div></div></div><div className="ingredients-card"><div className="ingredients-top"><span>Ingredients</span><span className="ingredient-badge">read the label</span></div><p>Cheese Powder, Dextrose, Skim Milk Powder, Salt, Sugar, Food Colour E110, Flavour Enhancer E621, Edible Starch, Whey Powder, Anticaking Agent E559 and permitted artificial flavouring substances.</p><div className="notice"><ShieldCheck size={17} /><span>Always read the packaging label, ingredients, warnings and usage instructions before consuming. Packaging may differ slightly from images shown.</span></div></div></div></section>

    <section className="final-cta"><div className="container final-grid"><ProductVisual back size="small" /><div><div className="eyebrow light">READY WHEN YOU ARE</div><h2>Let’s make your<br /><span>next snack better.</span></h2><div className="final-buy"><div><strong>Rs. 114</strong><del>Rs. 125</del><small>9% off</small></div><Link href="/checkout" className="button light-button">Order now — COD <ArrowRight size={17} /></Link></div><p className="light-note"><Clock3 size={14} /> Limited stock • 14-day free returns</p></div></div></section>

    <footer><div className="container footer-grid"><div><Brand /><p className="footer-copy">Good snacks are a small form of self-care. Keep yours close.</p></div><div><strong>Explore</strong><a href="#product">Product</a><a href="#benefits">Why it works</a><a href="#how">How to use</a></div><div><strong>Need a hand?</strong><span>Support: +977 98XXXXXXXX</span><span>Email: hello@meltandsprinkle.com</span><span>Returns: 14-day free returns</span></div></div><div className="container footer-bottom"><span>© 2026 Melt & Sprinkle</span><span>Cash on Delivery · Nepal</span><span>Product information may change — check pack label</span></div></footer>

    <div className="mobile-buy"><span><small>from</small><strong>Rs. 114</strong></span><Link href="/checkout">Buy now <ArrowRight size={16} /></Link></div>
  </main>;
}
