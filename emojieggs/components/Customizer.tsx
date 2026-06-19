"use client";
import { useState, useEffect, useRef } from "react";
import { FACES, OCCASION_FACES, FaceIcon, EggWithFace } from "./FaceEmoji";

const OCCASIONS = [
  { id: "birthday",  label: "Birthday 🎂" },
  { id: "love",      label: "Love & Romance 💕" },
  { id: "monday",    label: "Monday Blues 😩" },
  { id: "exam",      label: "Exam Day 📚" },
  { id: "party",     label: "Party Time 🎊" },
  { id: "morning",   label: "Good Morning ☀️" },
  { id: "health",    label: "Fitness & Health 💪" },
  { id: "funny",     label: "Funny Vibes 😂" },
  { id: "employees", label: "Employees 💼" },
];

const PACKS = [
  { label: "Half Dozen",   qty: 6,  price: 60  },
  { label: "Full Dozen",   qty: 12, price: 149 },
  { label: "Double Dozen", qty: 24, price: 199 },
  { label: "Party Pack",   qty: 48, price: 330 },
];

const EXTRAS = [
  { id: "box",     label: "🎁 Gift Box",         price: 29 },
  { id: "card",    label: "💌 Message Card",      price: 15 },
  { id: "express", label: "⚡ Express Delivery",  price: 39 },
];

export default function Customizer() {
  // Function to handle 'Add to Cart' action: marks item as added and opens the order form modal
  const handleOrder = () => {
    setAdded(true);
    setShowFormModal(true);
  };
  const [occasion, setOccasion]         = useState(OCCASIONS[0]);
  const [selectedFaces, setSelectedFaces] = useState<string[]>(["happy"]);
  const [pack, setPack]                 = useState(PACKS[1]);
  const [extras, setExtras]             = useState<string[]>([]);
  const [preview, setPreview]           = useState<string[]>([]);
  const [added, setAdded]               = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Geolocation & Delivery Charge States
  const [distance, setDistance] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [locating, setLocating] = useState<boolean>(false);
  const [storeLocation, setStoreLocation] = useState<{ lat: number; lng: number }>({ lat: 19.0760, lng: 72.8777 }); // Mumbai coords fallback

  // Try to use the store owner's current location as the store coordinates
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStoreLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Could not get current location for store, using default fallback.", error);
        }
      );
    }
  }, []);

  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const detectDistance = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const dist = calculateHaversineDistance(storeLocation.lat, storeLocation.lng, lat, lng);
        const roundedDist = Math.round(dist * 10) / 10;
        setDistance(roundedDist);
        const charge = roundedDist <= 5 ? 0 : Math.round((roundedDist - 5) * 4);
        setDeliveryCharge(charge);
        setLocating(false);
      },
      (error) => {
        console.error("Error detecting location:", error);
        alert("Failed to detect location. Please use the slider to enter distance manually.");
        setLocating(false);
      }
    );
  };

  const handleDistanceChange = (newVal: number) => {
    setDistance(newVal);
    const charge = newVal <= 5 ? 0 : Math.round((newVal - 5) * 4);
    setDeliveryCharge(charge);
  };

  // Validation for required fields
  const isFormValid = customerName.trim() !== "" && customerAddress.trim() !== "" && customerPhone.trim() !== "";
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    if (revealRef.current) obs.observe(revealRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (selectedFaces.length === 0) { setPreview([]); return; }
    const arr: string[] = [];
    for (let i = 0; i < pack.qty; i++) arr.push(selectedFaces[i % selectedFaces.length]);
    setPreview(arr);
  }, [selectedFaces, pack]);

  const toggleFace = (id: string) => {
    setSelectedFaces((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((x) => x !== id) : prev
        : [...prev, id]
    );
  };

  const toggleExtra = (id: string) =>
    setExtras((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const extraTotal = extras.reduce((s, id) => s + (EXTRAS.find((e) => e.id === id)?.price ?? 0), 0);
  const total = pack.price + extraTotal + deliveryCharge;

  const [orderSending, setOrderSending] = useState(false);
  // Send order details to backend API using nodemailer
  const handleSendOrder = async () => {
    // Play the cracking sound loudly and clearly
    try {
      const audio = new Audio("/egg-crack.mp3");
      audio.volume = 1.0;
      audio.play().catch(e => console.error("Audio playback failed", e));
    } catch (err) {
      console.error(err);
    }
    
    setOrderSending(true);
    const subject = `🥚 New EmojiEggs Order from ${customerName}`;
    const facesText = selectedFaces.map(id => FACES[id]?.label || id).join(', ');
    const addOnsText = extras.length > 0 ? extras.map(id => EXTRAS.find(e => e.id === id)?.label).join(', ') : 'None';
    const bodyLines = [
      `Name: ${customerName}`,
      `Address: ${customerAddress}`,
      `Phone: ${customerPhone}`,
      `Pack: ${pack.label} (${pack.qty} Eggs)`,
      `Occasion: ${occasion.label}`,
      `Faces: ${facesText}`,
      `Add-Ons: ${addOnsText}`,
      `Distance: ${distance} km`,
      `Delivery Charge: ₹${deliveryCharge}`,
      `Total: ₹${total}`,
    ];
    try {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'dinathayush@gmail.com',
            subject,
            body: bodyLines.join('\n'),
            customerName,
            customerPhone,
            customerAddress,
            pack: `${pack.label} (${pack.qty} Eggs)`,
            occasion: occasion.label,
            faces: facesText,
            addOns: addOnsText,
            distance: `${distance} km`,
            deliveryCharge: `₹${deliveryCharge}`,
            total: `₹${total}`,
          })
        });
        if (res.ok) setOrderSent(true);
        else console.error('Failed to send order email');
      } catch (e) {
        console.error('Error sending order:', e);
      } finally {
        setOrderSending(false);
      }
  };

  const occasionFaces = OCCASION_FACES[occasion.id] ?? [];

  return (
    <section className="py-24" id="order" style={{ background: "#F9F6EF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge" style={{ background: "#FFB800", color: "#1A1A2E" }}>🎨 Customise</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            Build Your Perfect Egg Box
          </h2>
          <p className="mt-2 font-semibold" style={{ color: "#666" }}>
            Every selection updates the preview and price live
          </p>
        </div>

        <div ref={revealRef} className="reveal grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">🎯</span> Step 1: Pick an Occasion
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => { setOccasion(occ); setSelectedFaces([OCCASION_FACES[occ.id][0]]); }}
                    className={`occasion-card text-sm font-bold ${occasion.id === occ.id ? "active" : ""}`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Face picker */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-2" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">😄</span> Step 2: Choose Your Face Expressions
              </h3>
              <p className="text-sm font-semibold mb-6" style={{ color: "#888" }}>
                Black &amp; white faces printed directly on each egg shell
              </p>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {occasionFaces.map((faceId) => {
                  const face = FACES[faceId];
                  const isSelected = selectedFaces.includes(faceId);
                  return (
                    <button
                      key={faceId}
                      onClick={() => toggleFace(faceId)}
                      title={face?.label}
                      style={{
                        border: `2.5px solid ${isSelected ? "#FF6B6B" : "#e5e7eb"}`,
                        background: isSelected ? "#FFF0F0" : "white",
                        borderRadius: 16,
                        padding: 8,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        boxShadow: isSelected ? "0 0 0 3px rgba(255,107,107,0.2)" : "none",
                        transform: isSelected ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <FaceIcon faceId={faceId} size={44} />
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#666", lineHeight: 1, textAlign: "center" }}>
                        {face?.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedFaces.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold" style={{ color: "#888" }}>Selected:</span>
                  {selectedFaces.map((id) => (
                    <div key={id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <FaceIcon faceId={id} size={32} />
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#555" }}>{FACES[id]?.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">🔢</span> Step 3: How Many Eggs?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PACKS.map((p) => (
                  <button
                    key={p.qty}
                    onClick={() => setPack(p)}
                    className={`rounded-2xl p-5 border-2 text-center transition-all cursor-pointer ${pack.qty === p.qty ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-yellow-300"}`}
                  >
                    <div className="font-display text-3xl" style={{ color: "#FFB800" }}>{p.qty}</div>
                    <div className="font-bold text-sm mt-1" style={{ color: "#1A1A2E" }}>{p.label}</div>
                    <div className="font-display text-lg mt-2" style={{ color: "#FF6B6B" }}>₹{p.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">✨</span> Step 4: Add-Ons (Optional)
              </h3>
              <div className="flex flex-col gap-3">
                {EXTRAS.map((ex) => (
                  <label
                    key={ex.id}
                    className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all"
                    style={{
                      borderColor: extras.includes(ex.id) ? "#FFB800" : "#e5e7eb",
                      background: extras.includes(ex.id) ? "#FFFBEF" : "white",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={extras.includes(ex.id)}
                      onChange={() => toggleExtra(ex.id)}
                      className="w-5 h-5 accent-yellow-400 cursor-pointer"
                    />
                    <span className="font-bold flex-1" style={{ color: "#1A1A2E" }}>{ex.label}</span>
                    <span className="font-display text-lg" style={{ color: "#FF6B6B" }}>+₹{ex.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 5 — Delivery Charges Calculator */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-3" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">🚚</span> Step 5: Check Delivery Distance & Charges
              </h3>
              <p className="text-sm font-semibold mb-6" style={{ color: "#888" }}>
                Free delivery within 5 km from our store. ₹4/km will be charged for any distance beyond 5 km.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
                  <div className="text-left">
                    <span className="text-xs font-bold block" style={{ color: "#FFB800" }}>STORE STATUS</span>
                    <span className="font-bold text-sm" style={{ color: "#1A1A2E" }}>📍 Store Location: Active (Your Current Location)</span>
                  </div>
                  <button
                    onClick={detectDistance}
                    disabled={locating}
                    className="font-display text-sm px-6 py-3 rounded-xl transition-all text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:scale-105"
                    style={{ border: "none", cursor: locating ? "not-allowed" : "pointer" }}
                  >
                    {locating ? "🌐 Detecting..." : "📍 Detect My Location"}
                  </button>
                </div>

                <div className="p-4 rounded-2xl border-2 border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm" style={{ color: "#1A1A2E" }}>Adjust Distance Manually</span>
                    <span className="font-display text-lg" style={{ color: "#FF6B6B" }}>{distance} km</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={distance}
                    onChange={(e) => handleDistanceChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-400 mt-1">
                    <span>0 km</span>
                    <span>25 km</span>
                    <span>50 km</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-100">
                  <div>
                    <span className="text-xs font-bold block text-emerald-600">DELIVERY CHARGE ESTIMATE</span>
                    <span className="font-bold text-sm text-emerald-800">
                      {distance <= 5 
                        ? "Within 5 km radius" 
                        : `${(distance - 5).toFixed(1)} km extra distance`
                      }
                    </span>
                  </div>
                  <span className="font-display text-2xl text-emerald-700">
                    {deliveryCharge === 0 ? "₹0 (Free)" : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            {/* Preview */}
            <div className="bg-white rounded-3xl p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-lg mb-4" style={{ color: "#1A1A2E" }}>🥚 Your Box Preview</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10,
                maxHeight: 300,
                overflowY: "auto",
                padding: "4px",
              }}>
                {preview.slice(0, 48).map((faceId, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                    <EggWithFace faceId={faceId} eggWidth={48} eggHeight={60} />
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold mt-3 text-center" style={{ color: "#aaa" }}>
                {pack.qty} eggs · {selectedFaces.length} face{selectedFaces.length > 1 ? "s" : ""} rotating
              </p>
            </div>

            {/* Price Card */}
            <div className="price-card">
              <h3 className="font-display text-xl mb-6 text-white">💰 Your Order Total</h3>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {pack.label} ({pack.qty} eggs)
                  </span>
                  <span className="font-display text-white text-lg">₹{pack.price}</span>
                </div>
                {extras.map((id) => {
                  const ex = EXTRAS.find((e) => e.id === id)!;
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>{ex.label}</span>
                      <span className="font-display text-white text-lg">₹{ex.price}</span>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>🚚 Delivery ({distance} km)</span>
                  <span className="font-display text-white text-lg">
                    {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-white border-opacity-20 my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-display text-white text-lg">Total</span>
                  <span className="font-display text-3xl" style={{ color: "#FFB800" }}>₹{total}</span>
                </div>
              </div>

              <div className="mb-5 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>YOUR FACES</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFaces.map((id) => (
                    <FaceIcon key={id} faceId={id} size={36} style={{ filter: "invert(1) brightness(2)" }} />
                  ))}
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  on {pack.qty} eggs · {occasion.label}
                </p>
              </div>

              <button
                onClick={handleOrder}
                className="w-full font-display text-lg py-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  background: added ? "#4ECDC4" : "linear-gradient(135deg, #FFB800, #FF6B6B)",
                  color: "white",
                  boxShadow: "0 6px 20px rgba(255,184,0,0.35)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {added ? "✅ Added to Cart!" : "Add to Cart 🛒"}
              </button>
              <p className="text-xs text-center mt-3 font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
                🚚 Free delivery on orders above ₹299
              </p>
            </div>

            <div className="rounded-3xl p-5 text-center" style={{ background: "linear-gradient(135deg, #FFE57F, #FFB800)" }}>
              <div className="mb-2" style={{ display: "flex", justifyContent: "center" }}>
                <FaceIcon faceId="happy" size={48} />
              </div>
              <p className="font-display text-sm" style={{ color: "#1A1A2E" }}>"We value your happiness"</p>
              <p className="text-xs font-semibold mt-1" style={{ color: "rgba(26,26,46,0.6)" }}>Every egg printed with love</p>
            </div>
          </div>
        </div>
      </div>

      {showFormModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "white",
            borderRadius: "28px",
            padding: "32px",
            maxWidth: "480px",
            width: "90%",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            position: "relative",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}>
            <button 
              onClick={() => {
                setShowFormModal(false);
                setOrderConfirmed(false);
              }}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#666",
                transition: "all 0.2s",
              }}>
              ×
            </button>
            {orderConfirmed ? (
              <>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📬</div>
                <h3 className="font-display text-2xl mb-2" style={{ color: "#1A1A2E" }}>Order Summary</h3>
                <p className="text-sm font-semibold mb-6" style={{ color: "#666" }}>
                  Thank you, {customerName}! Here are your order details.
                </p>
                <div style={{
                  background: "#F9F6EF",
                  borderRadius: "18px",
                  padding: "20px",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  marginBottom: "24px",
                  border: "1px dashed #FFD84D",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>📦 Pack:</span>
                    <span>{pack.label} ({pack.qty} Eggs)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>🎯 Occasion:</span>
                    <span>{occasion.label}</span>
                  </div>
                  <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                    <span>😄 Faces:</span>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                      {selectedFaces.map(id => (
                        <span key={id} style={{ background: "white", padding: "2px 8px", borderRadius: "8px", fontSize: "0.75rem", border: "1px solid #e5e7eb" }}>
                          {FACES[id]?.label || id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>✨ Add-Ons:</span>
                    <span>{extras.length > 0 ? extras.map(id => EXTRAS.find(e => e.id === id)?.label).join(", ") : "None"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>🚚 Distance:</span>
                    <span>{distance} km</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>💸 Delivery Charge:</span>
                    <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
                  </div>
                  <div style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0 8px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.1rem", color: "#FF6B6B" }}>
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <button onClick={handleSendOrder} disabled={orderSending} className="w-full font-display text-lg py-4 rounded-2xl mb-2" style={{ background: orderSending ? '#aaa' : "linear-gradient(135deg, #FF6B6B, #FFB800)", color: "white", boxShadow: "0 6px 20px rgba(255,184,0,0.35)" }}>{orderSending ? 'Sending...' : 'Send Order'}</button>
                <button onClick={() => setShowFormModal(false)} className="w-full font-display text-lg py-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)", color: "white", boxShadow: "0 6px 20px rgba(255,184,0,0.35)" }}>Close</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📬</div>
                <h3 className="font-display text-2xl mb-2" style={{ color: "#1A1A2E" }}>Enter Your Details</h3>
                <div className="flex flex-col gap-4" style={{ textAlign: "left" }}>
                  <input type="text" placeholder="Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="border p-2 rounded" />
                  <input type="text" placeholder="Address" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="border p-2 rounded" />
                  <input type="tel" placeholder="Phone Number" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="border p-2 rounded" />
                </div>
                <button
                  onClick={() => {
                    if (isFormValid) {
                      setOrderConfirmed(true);
                    }
                  }}
                  disabled={!isFormValid}
                  className="w-full font-display text-lg py-4 mt-4 rounded-2xl"
                  style={{
                    background: isFormValid ? "linear-gradient(135deg, #FFB800, #FF6B6B)" : "#ccc",
                    color: "white",
                    boxShadow: isFormValid ? "0 6px 20px rgba(255,184,0,0.35)" : "none",
                    cursor: isFormValid ? "pointer" : "not-allowed",
                  }}
                >
                  Confirm Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {orderSent && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
        }}>
          <div style={{
            background: "white",
            borderRadius: "28px",
            padding: "32px",
            maxWidth: "480px",
            width: "90%",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
          }}>
            <h3 className="font-display text-2xl mb-2" style={{ color: "#1A1A2E" }}>Order Received</h3>
            <p className="text-sm mb-4" style={{ color: "#666" }}>Your order has been placed successfully. We'll contact you soon.</p>
            <button onClick={() => { setOrderSent(false); setShowFormModal(false); }} className="w-full font-display text-lg py-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)", color: "white", boxShadow: "0 6px 20px rgba(255,184,0,0.35)" }}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
