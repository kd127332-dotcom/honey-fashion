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

  {
    name: "Blouse Stitching",
    stitch: 300,
    image: blouse,
    tag: "Trending"
  },

  {
    name: "Lehenga + Blouse",
    stitch: 1200,
    image: lehenga,
    tag: "Popular"
  },

  {
    name: "Palazzo Suit",
    stitch: 450,
    image: palazzo,
    tag: "New"
  },

  {
    name: "Gown",
    stitch: 900,
    image: gown,
    tag: "Premium"
  },

  {
    name: "Patiala Suit",
    stitch: 500,
    image: patiala,
    tag: "Trending"
  },

  {
    name: "North Indian Saree",
    stitch: 800,
    image: northsaree,
    tag: "New"
  },

  {
    name: "Silk Fabric Suit",
    stitch: 950,
    image: silksuit,
    tag: "Premium"
  },

  {
    name: "Designer Suit",
    stitch: 1100,
    image: anarkali,
    tag: "Trending"
  },

  {
    name: "Sharara Suit",
    stitch: 700,
    image: sarara,
    tag: "Popular"
  },

  {
    name: "Lehenga Choli",
    stitch: "600-1500",
    image: lahangaCholi,
    tag: "New"
  },

  {
    name: "Other Stitching",
    stitch: 0,
    image: cover,
    tag: "Custom"
  }
];

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customDesign, setCustomDesign] = useState("");
  const [cart, setCart] = useState([]);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("reviews");

    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);

  const saveReview = () => {

    if (!reviewText || rating === 0) {
      return alert("Please give rating & review");
    }

    const newReview = {
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString()
    };

    const updated = [newReview, ...reviews];

    setReviews(updated);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updated)
    );

    setRating(0);
    setReviewText("");
  };

  const addToCart = (item) => {

    let designText = item.name;

    if (item.name === "Other Stitching") {

      if (!customDesign) {
        return alert("Enter custom design");
      }

      designText = customDesign;
    }

    const exist = cart.find(
      (c) => c.designText === designText
    );

    if (exist) {

      setCart(
        cart.map((c) =>
          c.designText === designText
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          designText,
          qty: 1
        }
      ]);
    }
  };

  const updateQty = (index, type) => {

    const updated = [...cart];

    if (type === "inc") {
      updated[index].qty += 1;
    }

    if (type === "dec") {

      if (updated[index].qty > 1) {
        updated[index].qty -= 1;
      } else {
        updated.splice(index, 1);
      }
    }

    setCart(updated);
  };

  const removeItem = (index) => {

    const updated = [...cart];

    updated.splice(index, 1);

    setCart(updated);
  };

  const total = cart.reduce((sum, i) => {

    const price =
      typeof i.stitch === "number"
        ? i.stitch
        : 600;

    return sum + price * i.qty;

  }, 0);

  const sendWhatsApp = () => {

    if (!name || !phone) {
      return alert("Enter name & phone");
    }

    if (cart.length === 0) {
      return alert("Cart is empty");
    }

    const items = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.designText} x${item.qty}
₹${(typeof item.stitch === "number"
            ? item.stitch
            : 600) * item.qty}`
      )
      .join("\n");

    const msg = `Hello Honey Fashion Hub 👗

Name: ${name}
Phone: ${phone}

Order Details:
${items}

Total: ₹${total}

I want to place / inquire about this order.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (

    <div style={main}>

      {/* NAVBAR */}

      <div style={navbar}>

        <h2 style={logo}>
          Honey Fashion Hub 👗
        </h2>

        <div style={cartBadge}>
          🛒 {cart.length}
        </div>

      </div>

      {/* HERO SECTION */}

      <div style={hero}>

        <img
          src={cover}
          alt=""
          style={heroImg}
        />

        <div style={overlay}>

          <h1 style={heroTitle}>
            Honey Fashion Hub 👗
          </h1>

          <p style={heroText}>
            Premium Ladies Stitching Boutique
          </p>

          <p style={subText}>
            Expert Tailoring • Perfect Fitting • Custom Designs
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            style={heroBtn}
          >
            Order on WhatsApp
          </a>

        </div>

      </div>

      {/* USER FORM */}

      <div style={formBox}>

        <h2 style={heading}>
          Enter Your Details
        </h2>

        <div style={formRow}>

          <input
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />

          <input
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={input}
          />

        </div>

      </div>

      {/* PRODUCTS */}

      <div style={grid}>

        {categories.map((item, i) => (

          <div key={i} style={card}>

            <div style={tag}>
              {item.tag}
            </div>

            <img
              src={item.image}
              alt=""
              style={img}
            />

            <div style={content}>

              <h3>{item.name}</h3>

              <div style={stars}>
                ★★★★★
              </div>

              <div style={price}>
                ₹{item.stitch}
              </div>

              {item.name === "Other Stitching" && (

                <input
                  placeholder="Enter Custom Design"
                  value={customDesign}
                  onChange={(e) =>
                    setCustomDesign(e.target.value)
                  }
                  style={input}
                />
              )}

              <div style={btnRow}>

                <button
                  onClick={() => addToCart(item)}
                  style={addBtn}
                >
                  Add Cart
                </button>

                <button
                  onClick={sendWhatsApp}
                  style={whatsappBtn}
                >
                  Inquiry
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* CART */}

      <div style={section}>

        <h2 style={heading}>
          🛒 Your Cart
        </h2>

        {cart.length === 0 && (
          <p style={{ textAlign: "center" }}>
            Cart is Empty
          </p>
        )}

        {cart.map((item, i) => (

          <div key={i} style={cartItem}>

            <div>
              <strong>{item.designText}</strong>
            </div>

            <div style={qtyBox}>

              <button
                onClick={() => updateQty(i, "dec")}
                style={qtyBtn}
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => updateQty(i, "inc")}
                style={qtyBtn}
              >
                +
              </button>

            </div>

            <div>
              ₹{(typeof item.stitch === "number"
                ? item.stitch
                : 600) * item.qty}
            </div>

            <button
              onClick={() => removeItem(i)}
              style={removeBtn}
            >
              ❌
            </button>

          </div>

        ))}

        {cart.length > 0 && (

          <>
            <h3 style={{ textAlign: "right" }}>
              Total: ₹{total}
            </h3>

            <button
              onClick={sendWhatsApp}
              style={checkoutBtn}
            >
              Place Order on WhatsApp
            </button>
          </>
        )}

      </div>

      {/* REVIEWS */}

      <div style={section}>

        <h2 style={heading}>
          ⭐ Customer Reviews
        </h2>

        <div style={{ textAlign: "center" }}>

          {[1, 2, 3, 4, 5].map((s) => (

            <span
              key={s}
              onClick={() => setRating(s)}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color: s <= rating ? "gold" : "#ccc"
              }}
            >
              ★
            </span>

          ))}

        </div>

        <input
          placeholder="Write Review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={reviewInput}
        />

        <button
          onClick={saveReview}
          style={checkoutBtn}
        >
          Submit Review
        </button>

        {reviews.map((r, i) => (

          <div key={i} style={reviewCard}>

            <div style={{ color: "gold" }}>
              {"★".repeat(r.rating)}
            </div>

            <p>{r.text}</p>

            <small>{r.date}</small>

          </div>

        ))}

      </div>

      {/* LOCATION */}

      <div style={section}>

        <h2 style={heading}>
          📍 Visit Us
        </h2>

        <p style={{ textAlign: "center" }}>
          Near 16 No Bus Stop, Thergaon, Pune - 411033
        </p>

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Near 16 No Bus Stop Thergaon Pune 411033&output=embed"
          width="100%"
          height="300"
          style={{
            border: 0,
            borderRadius: "12px"
          }}
        />

      </div>

      {/* FLOATING WHATSAPP */}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        style={floating}
      >
        💬
      </a>

      {/* FOOTER */}

      <footer style={footer}>

        <h2>
          Honey Fashion Hub 👗
        </h2>

        <p>
          ✨ Premium Ladies Stitching Boutique
        </p>

        <p>
          📍 Near 16 No Bus Stop, Thergaon, Pune
        </p>

        <p>
          📞 Call: 8657914355
        </p>

        <p>
          💬 WhatsApp: 9728324421
        </p>

        <p style={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Honey Fashion Hub
        </p>

      </footer>

    </div>
  );
}

/* MAIN */

const main = {
  background: "#f5f5f5",
  fontFamily: "Arial"
};

/* NAVBAR */

const navbar = {
  background: "#111",
  color: "white",
  padding: "18px 25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 999
};

const logo = {
  margin: 0,
  fontSize: "40px",
  fontWeight: "900"
};

const cartBadge = {
  background:
    "linear-gradient(135deg,#ff4081,#ff0066)",
  padding: "12px 22px",
  borderRadius: "40px",
  fontWeight: "bold",
  fontSize: "20px"
};

/* HERO */

const hero = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  background: "#000"
};

const heroImg = {
  width: "100%",
  height: "170%",

  /* IMAGE FULL WIDTH */
  objectFit: "cover",

  /* FACE UPAR RAHE */
  objectPosition: "top center",

  display: "block"
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  textAlign: "center",
  color: "white",

  background:
    "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45))"
};
const heroTitle = {
  fontSize: "clamp(45px,7vw,95px)",
  fontWeight: "900",
  color: "white",
  marginBottom: "10px",
  textShadow:
    "0 5px 20px rgba(0,0,0,0.7)"
};

const heroText = {
  fontSize: "clamp(20px,3vw,38px)",
  color: "white",
  fontWeight: "700",
  marginBottom: "10px",
  textShadow:
    "0 4px 15px rgba(0,0,0,0.7)"
};

const subText = {
  fontSize: "18px",
  color: "white",
  marginBottom: "30px",
  textShadow:
    "0 3px 12px rgba(0,0,0,0.7)"
};

const heroBtn = {
  background:
    "linear-gradient(135deg,#25D366,#16a34a)",
  color: "white",
  padding: "16px 40px",
  borderRadius: "50px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "18px",
  boxShadow:
    "0 10px 30px rgba(37,211,102,0.4)"
};

/* FORM */

const formBox = {
  background: "white",
  margin: "30px auto",
  maxWidth: "900px",
  padding: "25px",
  borderRadius: "15px"
};

const heading = {
  textAlign: "center",
  marginBottom: "20px"
};

const formRow = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap"
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

/* PRODUCTS */

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(260px,1fr))",
  gap: "20px",
  padding: "20px"
};

const card = {
  background: "white",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
  boxShadow:
    "0 5px 15px rgba(0,0,0,0.1)"
};

const tag = {
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "#ff4081",
  color: "white",
  padding: "5px 12px",
  borderRadius: "20px",
  zIndex: 10
};

const img = {
  width: "100%",
  height: "320px",
  objectFit: "cover"
};

const content = {
  padding: "15px"
};

const stars = {
  color: "gold",
  margin: "10px 0"
};

const price = {
  background: "#fff3e0",
  padding: "10px",
  borderRadius: "8px",
  fontWeight: "bold"
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const addBtn = {
  flex: 1,
  background: "#ff6600",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer"
};

const whatsappBtn = {
  flex: 1,
  background: "#25D366",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer"
};

/* SECTIONS */

const section = {
  background: "white",
  margin: "25px",
  padding: "25px",
  borderRadius: "15px"
};

/* CART */

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  flexWrap: "wrap",
  gap: "10px"
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const qtyBtn = {
  padding: "5px 12px"
};

const removeBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer"
};

const checkoutBtn = {
  width: "100%",
  background: "#25D366",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "8px",
  marginTop: "20px",
  cursor: "pointer",
  fontSize: "16px"
};

/* REVIEWS */

const reviewInput = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const reviewCard = {
  background: "#fafafa",
  padding: "15px",
  borderRadius: "10px",
  marginTop: "15px"
};

/* FLOAT BUTTON */

const floating = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#25D366",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  color: "white",
  fontSize: "28px",
  boxShadow:
    "0 5px 15px rgba(0,0,0,0.2)"
};

/* FOOTER */

const footer = {
  background: "#111",
  color: "white",
  textAlign: "center",
  padding: "40px 20px",
  marginTop: "40px"
};

export default App;