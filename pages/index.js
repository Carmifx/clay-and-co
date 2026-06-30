import React, { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Ash Glaze Mug", stage: "Glaze fire — Cone 6", price: 38, blurb: "Wheel-thrown stoneware, wood-ash glaze pooling at the base.", color: "#5C7A6E" },
  { id: 2, name: "Bisque Bowl, Set of 2", stage: "Bisque fire — Cone 04", price: 56, blurb: "Nesting bowls left in raw bisque for a chalky, matte hand-feel.", color: "#D9CFC1" },
  { id: 3, name: "Rust Carafe", stage: "Glaze fire — Cone 6", price: 64, blurb: "Iron-rich slip under a clear glaze, fired until it breaks rust at the edges.", color: "#A8542E" },
  { id: 4, name: "Celadon Vase, Tall", stage: "Glaze fire — Cone 10", price: 92, blurb: "Reduction-fired celadon, deep enough to hold a single branch.", color: "#5C7A6E" },
  { id: 5, name: "Speckled Plate Set", stage: "Bisque fire — Cone 04", price: 74, blurb: "Iron-speckled stoneware clay, left unglazed on the rim.", color: "#2B2825" },
  { id: 6, name: "Greenware Candle Vessel", stage: "Greenware — unfired", price: 22, blurb: "Hand-built from slab, leather-hard texture preserved in the final fire.", color: "#D9CFC1" },
  { id: 7, name: "Charcoal Teapot", stage: "Glaze fire — Cone 6", price: 88, blurb: "Matte charcoal glaze, cane handle bound by hand.", color: "#2B2825" },
  { id: 8, name: "Sand Dune Pitcher", stage: "Glaze fire — Cone 6", price: 58, blurb: "Layered glaze poured in two passes for a horizon line.", color: "#D9CFC1" },
];

const STAGES = [
  { n: "01", label: "Greenware", desc: "Shaped on the wheel or hand-built, dried slow to avoid cracking." },
  { n: "02", label: "Bisque fire", desc: "First firing, ~1830°F, hardens the clay body without sealing it." },
  { n: "03", label: "Glaze", desc: "Glaze applied by dip or pour, each piece by hand, no two identical." },
  { n: "04", label: "Glaze fire", desc: "Second firing up to Cone 10 (~2350°F), where the glaze melts to glass." },
];

function CartIcon({ count }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B2825" strokeWidth="1.6">
        <circle cx="9" cy="21" r="1.2" fill="#2B2825" stroke="none" />
        <circle cx="18" cy="21" r="1.2" fill="#2B2825" stroke="none" />
        <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span style={{
          position: "absolute", top: -8, right: -10, background: "#A8542E", color: "#F2EEE6",
          borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex",
          alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace"
        }}>{count}</span>
      )}
    </div>
  );
}

export default function ClayAndCo() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [shipping, setShipping] = useState({ name: "", email: "", address: "" });
  const [orderNumber, setOrderNumber] = useState(null);

  const addToCart = (product) => {
    setCart((c) => [...c, product]);
    setToast(`Added ${product.name}`);
    setTimeout(() => setToast(""), 1800);
  };

  const removeFromCart = (idx) => {
    setCart((c) => c.filter((_, i) => i !== idx));
  };

  const total = cart.reduce((s, p) => s + p.price, 0);

  const placeOrder = () => {
    setOrderNumber(`CC-${Math.floor(1000 + Math.random() * 9000)}`);
    setCheckoutStep("confirmed");
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    if (checkoutStep === "confirmed") {
      setCart([]);
      setShipping({ name: "", email: "", address: "" });
    }
    setCheckoutStep("cart");
  };

  return (
    <div style={{
      fontFamily: "'Work Sans', sans-serif", background: "#F2EEE6", color: "#2B2825",
      minHeight: "100vh", lineHeight: 1.5
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Work+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        h1, h2, h3 { font-family: 'Fraunces', serif; margin: 0; }
        button { cursor: pointer; font-family: inherit; }
        .cardBtn:focus-visible, .navBtn:focus-visible { outline: 2px solid #A8542E; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 5vw", position: "sticky", top: 0, background: "#F2EEE6ee",
        backdropFilter: "blur(6px)", zIndex: 10, borderBottom: "1px solid #D9CFC1"
      }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 }}>Clay & Co.</span>
        <div style={{ display: "flex", gap: 28, alignItems: "center", fontSize: 14 }}>
          <span style={{ display: typeof window !== "undefined" && window.innerWidth < 640 ? "none" : "inline" }}>Shop</span>
          <span style={{ display: typeof window !== "undefined" && window.innerWidth < 640 ? "none" : "inline" }}>Process</span>
          <span style={{ display: typeof window !== "undefined" && window.innerWidth < 640 ? "none" : "inline" }}>Visit</span>
          <button className="navBtn" onClick={() => setCheckoutOpen(true)} style={{ background: "none", border: "none", padding: 4 }} aria-label="Open cart">
            <CartIcon count={cart.length} />
          </button>
        </div>
      </nav>

      <header style={{
        padding: "10vh 5vw 8vh", maxWidth: 900, margin: "0 auto", textAlign: "left"
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5,
          color: "#5C7A6E", textTransform: "uppercase", marginBottom: 18
        }}>Cone 6 stoneware · fired in small batches</p>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 76px)", fontWeight: 500, letterSpacing: -1, maxWidth: 760 }}>
          Functional pottery, made one kiln load at a time.
        </h1>
        <p style={{ fontSize: 18, color: "#5C534A", maxWidth: 520, marginTop: 24 }}>
          Every piece passes through four firing stages before it reaches your table — wheel-thrown
          and hand-built in a small studio, not a factory line.
        </p>
        <button className="navBtn" style={{
          marginTop: 36, background: "#2B2825", color: "#F2EEE6", border: "none",
          padding: "14px 28px", fontSize: 15, borderRadius: 2
        }}>Shop the current kiln load</button>
      </header>

      <section style={{ padding: "6vh 5vw", background: "#E8E2D8", borderTop: "1px solid #D9CFC1", borderBottom: "1px solid #D9CFC1" }}>
        <h2 style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 36, color: "#5C534A" }}>
          From clay to kiln — the four stages
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {STAGES.map((s) => (
            <div key={s.n} style={{ borderLeft: "2px solid #A8542E", paddingLeft: 16 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#A8542E" }}>{s.n}</span>
              <h3 style={{ fontSize: 19, fontWeight: 500, margin: "6px 0" }}>{s.label}</h3>
              <p style={{ fontSize: 14, color: "#5C534A" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "8vh 5vw" }} id="shop">
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 500, marginBottom: 8 }}>This kiln load</h2>
        <p style={{ color: "#5C534A", marginBottom: 40 }}>8 pieces, fired the week of June 23. Once they sell, they're gone — no reprints.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 28 }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{ background: "#fff", border: "1px solid #D9CFC1" }}>
              <div style={{ height: 160, background: p.color, position: "relative" }}>
                <span style={{
                  position: "absolute", bottom: 10, left: 10, fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: "#F2EEE6", background: "#2B2825aa", padding: "3px 8px"
                }}>{p.stage}</span>
              </div>
              <div style={{ padding: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 500 }}>{p.name}</h3>
                <p style={{ fontSize: 13, color: "#5C534A", margin: "8px 0 16px", minHeight: 36 }}>{p.blurb}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15 }}>${p.price}</span>
                  <button className="cardBtn" onClick={() => addToCart(p)} style={{
                    background: "transparent", border: "1px solid #2B2825", padding: "8px 14px", fontSize: 13
                  }}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "8vh 5vw", background: "#2B2825", color: "#F2EEE6" }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 500, marginBottom: 16 }}>Visit the studio</h2>
          <p style={{ color: "#D9CFC1", marginBottom: 24 }}>
            Open Thursday through Sunday, 11–5. We fire two kiln loads a month — sign up below to
            hear when the next one goes live, before it's posted publicly.
          </p>
          <div style={{ display: "flex", gap: 10, maxWidth: 380 }}>
            <input placeholder="you@email.com" style={{
              flex: 1, padding: "12px 14px", border: "1px solid #5C534A", background: "transparent",
              color: "#F2EEE6", fontSize: 14
            }} />
            <button style={{ background: "#A8542E", color: "#F2EEE6", border: "none", padding: "0 20px", fontSize: 14 }}>Notify me</button>
          </div>
        </div>
      </section>

      <footer style={{ padding: "24px 5vw", fontSize: 13, color: "#5C534A", display: "flex", justifyContent: "space-between" }}>
        <span>Clay & Co. — small-batch stoneware</span>
        <button onClick={() => setCheckoutOpen(true)} style={{ background: "none", border: "none", color: "#5C534A", fontSize: 13, textDecoration: "underline", padding: 0 }}>
          {cart.length > 0 ? `Cart: ${cart.length} item(s), $${total}` : "Cart empty"}
        </button>
      </footer>

      {checkoutOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "#2B2825cc", zIndex: 30,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }} onClick={closeCheckout}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#F2EEE6", width: "min(480px, 100%)", maxHeight: "85vh", overflowY: "auto",
            padding: "32px 28px", position: "relative"
          }}>
            <button onClick={closeCheckout} aria-label="Close" style={{
              position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, color: "#5C534A"
            }}>✕</button>

            {checkoutStep === "cart" && (
              <>
                <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}>Your cart</h2>
                {cart.length === 0 ? (
                  <p style={{ color: "#5C534A" }}>Nothing here yet. Add a piece from the kiln load.</p>
                ) : (
                  <>
                    {cart.map((p, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #D9CFC1" }}>
                        <span style={{ fontSize: 14 }}>{p.name}</span>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>${p.price}</span>
                          <button onClick={() => removeFromCart(i)} style={{ background: "none", border: "none", color: "#A8542E", fontSize: 12 }}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontWeight: 500 }}>
                      <span>Total</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${total}</span>
                    </div>
                    <button onClick={() => setCheckoutStep("shipping")} style={{
                      width: "100%", background: "#2B2825", color: "#F2EEE6", border: "none", padding: "14px", fontSize: 15, marginTop: 8
                    }}>Continue to shipping</button>
                  </>
                )}
              </>
            )}

            {checkoutStep === "shipping" && (
              <>
                <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 6 }}>Shipping details</h2>
                <p style={{ fontSize: 13, color: "#5C534A", marginBottom: 20 }}>Demo only — no payment is processed.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Full name" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    style={{ padding: "12px 14px", border: "1px solid #D9CFC1", fontSize: 14, background: "#fff" }} />
                  <input placeholder="Email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    style={{ padding: "12px 14px", border: "1px solid #D9CFC1", fontSize: 14, background: "#fff" }} />
                  <input placeholder="Shipping address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    style={{ padding: "12px 14px", border: "1px solid #D9CFC1", fontSize: 14, background: "#fff" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontWeight: 500 }}>
                  <span>Total</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${total}</span>
                </div>
                <button
                  disabled={!shipping.name || !shipping.email || !shipping.address}
                  onClick={placeOrder}
                  style={{
                    width: "100%", background: (!shipping.name || !shipping.email || !shipping.address) ? "#a59c8d" : "#A8542E",
                    color: "#F2EEE6", border: "none", padding: "14px", fontSize: 15,
                    cursor: (!shipping.name || !shipping.email || !shipping.address) ? "not-allowed" : "pointer"
                  }}>Place order</button>
                <button onClick={() => setCheckoutStep("cart")} style={{ width: "100%", background: "none", border: "none", color: "#5C534A", fontSize: 13, marginTop: 10 }}>Back to cart</button>
              </>
            )}

            {checkoutStep === "confirmed" && (
              <>
                <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 10 }}>Order placed</h2>
                <p style={{ fontSize: 14, color: "#5C534A", marginBottom: 4 }}>Confirmation number</p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, marginBottom: 20 }}>{orderNumber}</p>
                <p style={{ fontSize: 14, color: "#5C534A", marginBottom: 24 }}>
                  We'll send tracking to {shipping.email} once it ships from the studio.
                  This is a demo confirmation — no real order or charge has occurred.
                </p>
                <button onClick={closeCheckout} style={{
                  width: "100%", background: "#2B2825", color: "#F2EEE6", border: "none", padding: "14px", fontSize: 15
                }}>Done</button>
              </>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#2B2825", color: "#F2EEE6", padding: "10px 20px", fontSize: 14, borderRadius: 2
        }}>{toast}</div>
      )}
    </div>
  );
}
