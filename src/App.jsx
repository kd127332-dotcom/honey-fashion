import { useState, useEffect } from "react";

import anarkali from "./assets/anarkali.jpg";
import blouse from "./assets/blouse.jpg";
import cover from "./assets/cover.jpg";
import gown from "./assets/gown.jpg";
import lahangaCholi from "./assets/lahangacholi.jpg";
import lehenga from "./assets/lehenga.jpg";
import northsaree from "./assets/northsaree.jpg";
import palazzo from "./assets/palazzo.jpg";
import patiala from "./assets/patiala.jpg";
import sarara from "./assets/sarara.jpg";
import silksuit from "./assets/silksuit.jpg";
import simplesuit from "./assets/simplesuit.jpg";

const WHATSAPP_NUMBER = "919728324421";

const categories = [
  { name: "Simple Suit", stitch: 300, image: simplesuit, tag: "Popular" },
  { name: "Blouse Stitching", stitch: 300, image: blouse, tag: "Trending" },
  { name: "Lehenga + Blouse", stitch: 1200, image: lehenga, tag: "Popular" },
  { name: "Palazzo Suit", stitch: 450, image: palazzo, tag: "New" },
  { name: "Gown", stitch: 900, image: gown, tag: "Premium" },
  { name: "Patiala Suit", stitch: 500, image: patiala, tag: "Trending" },
  { name: "North Indian Saree", stitch: 800, image: northsaree, tag: "New" },
  { name: "Silk Suit", stitch: 950, image: silksuit, tag: "Premium" },
  { name: "Anarkali Suit", stitch: 1100, image: anarkali, tag: "Trending" },
  { name: "Sharara Suit", stitch: 700, image: sarara, tag: "Popular" },
  { name: "Lehenga Choli", stitch: "600-1500", image: lahangaCholi, tag: "New" },
  { name: "Custom Stitching", stitch: 0, image: cover, tag: "Custom" }
];

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customDesign, setCustomDesign] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    let designText = item.name;

    if (item.name === "Custom Stitching") {
      if (!customDesign) return alert("Enter custom design");
      designText = customDesign;
    }

    const exist = cart.find((c) => c.designText === designText);

    if (exist) {
      setCart(
        cart.map((c) =>
          c.designText === designText
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, designText, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, i) => {
    const price = typeof i.stitch === "number" ? i.stitch : 600;
    return sum + price * i.qty;
  }, 0);

  const sendWhatsApp = () => {
    if (!name || !phone) return alert("Enter details");
    if (cart.length === 0) return alert("Cart empty");

    const items = cart
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.designText} x${i.qty}`
      )
      .join("\n");

    const msg = `Hello Honey Fashion Hub\nName: ${name}\nPhone: ${phone}\n\nOrder:\n${items}\n\nTotal: ₹${total}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <div className="navbar">
        <h2>Honey Fashion Hub 👗</h2>
      </div>

      {/* HERO */}
      <div className="hero">
        <img src={cover} alt="hero" className="hero-img" />
        <div className="hero-text">
          <h1>Honey Fashion Hub</h1>
          <p>Premium Ladies Boutique</p>
        </div>
      </div>

      {/* FORM */}
      <div className="form">
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      </div>

      {/* PRODUCTS */}
      <div className="grid">
        {categories.map((item, i) => (
          <div className="card" key={i}>
            <img src={item.image} className="card-img" />
            <h3>{item.name}</h3>
            <p>₹{item.stitch}</p>

            {item.name === "Custom Stitching" && (
              <input
                placeholder="Custom Design"
                onChange={(e) => setCustomDesign(e.target.value)}
              />
            )}

            <button onClick={() => addToCart(item)}>Add Cart</button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div className="cart">
        <h2>Cart</h2>
        {cart.map((i, idx) => (
          <p key={idx}>
            {i.designText} x{i.qty}
          </p>
        ))}

        <h3>Total: ₹{total}</h3>

        <button onClick={sendWhatsApp}>
          Place Order on WhatsApp
        </button>
      </div>

    </div>
  );
}

export default App;