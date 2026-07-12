"use client";
import { useState, useEffect, useRef } from "react";
import { FACES, OCCASION_FACES, FaceIcon, EggWithFace } from "./FaceEmoji";
import { useLanguage } from "@/context/LanguageContext";

const OCCASIONS_IDS = ["birthday", "love", "monday", "exam", "party", "morning", "health", "funny", "employees"];

const PACKS_IDS = [
  { id: "Half Dozen", qty: 6, price: 65 },
  { id: "Full Dozen", qty: 12, price: 125 },
  { id: "Double Dozen", qty: 24, price: 230 },
];

const EXTRAS_IDS = [
  { id: "box", price: 59 },
  { id: "card", price: 15 },
  { id: "express", price: 39 },
];

export default function Customizer() {
  const { t } = useLanguage();
  
  const handleOrder = () => {
    setAdded(true);
    setShowFormModal(true);
  };
  const [mode, setMode]                 = useState<"custom" | "predesigned">("custom");
  const [selectedPrepackId, setSelectedPrepackId] = useState<string>("sorry");
  
  const [occasion, setOccasion]         = useState(OCCASIONS_IDS[0]);
  const [selectedFaces, setSelectedFaces] = useState<string[]>(["happy"]);
  const [pack, setPack]                 = useState(PACKS_IDS[1]);
  const [extras, setExtras]             = useState<string[]>([]);
  const [preview, setPreview]           = useState<string[]>([]);
  const [added, setAdded]               = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
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
    if (mode === "predesigned") {
      const prepack = t.customizer.preDesignedPacks.find((p: any) => p.id === selectedPrepackId);
      if (prepack) {
        setPreview(prepack.emojis);
      }
      return;
    }
    if (selectedFaces.length === 0) { setPreview([]); return; }
    const arr: string[] = [];
    for (let i = 0; i < pack.qty; i++) arr.push(selectedFaces[i % selectedFaces.length]);
    setPreview(arr);
  }, [selectedFaces, pack, mode, selectedPrepackId, t.customizer.preDesignedPacks]);

  const toggleFace = (id: string) => {
    setSelectedFaces((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((x) => x !== id) : prev
        : [...prev, id]
    );
  };

  const toggleExtra = (id: string) =>
    setExtras((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const extraTotal = extras.reduce((s, id) => s + (EXTRAS_IDS.find((e) => e.id === id)?.price ?? 0), 0);
  
  const selectedPrepack = t.customizer.preDesignedPacks.find((p: any) => p.id === selectedPrepackId);
  const basePrice = mode === "predesigned" ? (selectedPrepack?.price || 139) : pack.price;
  const total = basePrice + extraTotal;

  const [orderSending, setOrderSending] = useState(false);
  
  const handleSendOrder = async () => {
    try {
      const audio = new Audio("/egg-crack.mp3");
      audio.volume = 1.0;
      audio.play().catch(e => console.error("Audio playback failed", e));
    } catch (err) {
      console.error(err);
    }
    
    setOrderSending(true);
    const subject = `🥚 New FaciEggs Order from ${customerName}`;
    const addOnsText = extras.length > 0 ? extras.map(id => t.customizer.extras[id as keyof typeof t.customizer.extras]).join(', ') : 'None';
    
    let orderDetails = [];
    if (mode === "predesigned") {
      orderDetails = [
        `Mode: Pre-Designed Pack`,
        `Pack: ${selectedPrepack?.name}`,
        `Emojis: ${selectedPrepack?.emojis?.map((id: string) => FACES[id]?.emoji || FACES[id]?.label || id).join(' ')}`
      ];
    } else {
      const facesText = selectedFaces.map(id => FACES[id]?.emoji || FACES[id]?.label || id).join(', ');
      orderDetails = [
        `Mode: Custom Pack`,
        `Pack: ${t.customizer.packs[pack.id as keyof typeof t.customizer.packs]} (${pack.qty} Eggs)`,
        `Occasion: ${t.customizer.occasions[occasion as keyof typeof t.customizer.occasions]}`,
        `Faces: ${facesText}`
      ];
    }

    const bodyLines = [
      `Name: ${customerName}`,
      `Address: ${customerAddress}`,
      `Phone: ${customerPhone}`,
      ...(extras.includes("card") && customerMessage.trim() ? [`Message: ${customerMessage}`] : []),
      ...orderDetails,
      `Add-Ons: ${addOnsText}`,
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
            customerMessage: extras.includes("card") ? customerMessage : undefined,
            pack: mode === "predesigned" ? selectedPrepack?.name : `${t.customizer.packs[pack.id as keyof typeof t.customizer.packs]} (${pack.qty} Eggs)`,
            occasion: mode === "predesigned" ? selectedPrepack?.theme : t.customizer.occasions[occasion as keyof typeof t.customizer.occasions],
            faces: mode === "predesigned" ? selectedPrepack?.emojis?.map((id: string) => FACES[id]?.emoji || FACES[id]?.label || id).join(', ') : selectedFaces.map(id => FACES[id]?.emoji || FACES[id]?.label || id).join(', '),
            addOns: addOnsText,
            total: `₹${total}`,
          })
        });
        if (res.ok) {
          setOrderSent(true);
        } else {
          console.error('Failed to send order email');
          alert('Failed to send request. Please try again or check your configuration.');
        }
      } catch (e) {
        console.error('Error sending order:', e);
      } finally {
        setOrderSending(false);
      }
  };

  const occasionFaces = OCCASION_FACES[occasion] ?? [];

  return (
    <section className="py-24" id="order" style={{ background: "#F9F6EF" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge" style={{ background: "#FFB800", color: "#1A1A2E" }}>{t.customizer.badge}</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            {t.customizer.title}
          </h2>
          <p className="mt-2 font-semibold" style={{ color: "#666" }}>
            {t.customizer.subtitle}
          </p>
        </div>

        <div ref={revealRef} className="reveal grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Mode Selector */}
            <div className="bg-white rounded-full p-2 flex" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <button 
                onClick={() => setMode("custom")}
                className="flex-1 py-3 rounded-full font-bold text-sm transition-all"
                style={{ 
                  background: mode === "custom" ? "#1A1A2E" : "transparent",
                  color: mode === "custom" ? "white" : "#666"
                }}
              >
                {t.customizer.modes?.custom || "🎨 Customise Your Own"}
              </button>
              <button 
                onClick={() => setMode("predesigned")}
                className="flex-1 py-3 rounded-full font-bold text-sm transition-all"
                style={{ 
                  background: mode === "predesigned" ? "#1A1A2E" : "transparent",
                  color: mode === "predesigned" ? "white" : "#666"
                }}
              >
                {t.customizer.modes?.predesigned || "🎁 Pre-Designed Packs"}
              </button>
            </div>

            {mode === "custom" ? (
              <>
                {/* Step 1 */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                  <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                    <span className="mr-2 text-2xl">🎯</span> {t.customizer.step1}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {OCCASIONS_IDS.map((occId) => (
                      <button
                        key={occId}
                        onClick={() => { setOccasion(occId); setSelectedFaces([OCCASION_FACES[occId][0]]); }}
                        className={`occasion-card text-sm font-bold ${occasion === occId ? "active" : ""}`}
                      >
                        {t.customizer.occasions[occId as keyof typeof t.customizer.occasions]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 — Face picker */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                  <h3 className="font-display text-xl mb-2" style={{ color: "#1A1A2E" }}>
                    <span className="mr-2 text-2xl">😄</span> {t.customizer.step2}
                  </h3>
                  <p className="text-sm font-semibold mb-6" style={{ color: "#888" }}>
                    {t.customizer.step2Desc}
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
                      <span className="text-xs font-bold" style={{ color: "#888" }}>{t.customizer.selected}</span>
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
                    <span className="mr-2 text-2xl">🔢</span> {t.customizer.step3}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {PACKS_IDS.map((p) => (
                      <button
                        key={p.qty}
                        onClick={() => setPack(p)}
                        className={`rounded-2xl p-5 border-2 text-center transition-all cursor-pointer ${pack.qty === p.qty ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-yellow-300"}`}
                      >
                        <div className="font-display text-3xl" style={{ color: "#FFB800" }}>{p.qty}</div>
                        <div className="font-bold text-sm mt-1" style={{ color: "#1A1A2E" }}>{t.customizer.packs[p.id as keyof typeof t.customizer.packs]}</div>
                        <div className="font-display text-lg mt-2" style={{ color: "#FF6B6B" }}>₹{p.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Pre-designed Step 1 */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                  <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                    <span className="mr-2 text-2xl">🎁</span> {t.customizer.modes?.predesigned || "Pre-Designed Packs"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(t.customizer.preDesignedPacks || []).map((p: any) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPrepackId(p.id)}
                        className={`rounded-2xl p-5 border-2 text-left transition-all cursor-pointer ${selectedPrepackId === p.id ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white hover:border-yellow-300"}`}
                      >
                        <div className="font-display text-lg mb-1" style={{ color: "#1A1A2E" }}>{p.name}</div>
                        <div className="font-bold text-xs mb-2" style={{ color: "#666" }}>{p.theme}</div>
                        <div className="text-xs italic text-gray-500 mb-3">"{p.tagline}"</div>
                        <div className="font-display text-lg" style={{ color: "#FF6B6B" }}>₹{p.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 4 (or Step 2 in predesigned) */}
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-xl mb-5" style={{ color: "#1A1A2E" }}>
                <span className="mr-2 text-2xl">✨</span> {t.customizer.step4}
              </h3>
              <div className="flex flex-col gap-3">
                {EXTRAS_IDS.map((ex) => (
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
                    <span className="font-bold flex-1" style={{ color: "#1A1A2E" }}>{t.customizer.extras[ex.id as keyof typeof t.customizer.extras]}</span>
                    <span className="font-display text-lg" style={{ color: "#FF6B6B" }}>+₹{ex.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            {/* Preview */}
            <div className="bg-white rounded-3xl p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <h3 className="font-display text-lg mb-4" style={{ color: "#1A1A2E" }}>{t.customizer.previewTitle}</h3>
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
                    <EggWithFace faceId={faceId} eggWidth={48} eggHeight={60} isWhite={true} />
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold mt-3 text-center" style={{ color: "#aaa" }}>
                {mode === "predesigned" 
                  ? t.customizer.previewDesc(preview.length, preview.length) 
                  : t.customizer.previewDesc(pack.qty, selectedFaces.length)}
              </p>
              <div className="mt-4 p-3.5 rounded-2xl border border-dashed text-xs text-center leading-relaxed" style={{
                background: "linear-gradient(135deg, #FFF9E6, #FFF0F0)",
                borderColor: "#FFD3B6",
                color: "#5C5C6A",
              }}>
                {t.customizer.previewDisclaimer}
              </div>
            </div>

            {/* Price Card */}
            <div className="price-card">
              <h3 className="font-display text-xl mb-6 text-white">{t.customizer.priceTitle}</h3>
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {mode === "predesigned" ? selectedPrepack?.name : `${t.customizer.packs[pack.id as keyof typeof t.customizer.packs]} (${pack.qty} eggs)`}
                  </span>
                  <span className="font-display text-white text-lg">₹{basePrice}</span>
                </div>
                {extras.map((id) => {
                  const ex = EXTRAS_IDS.find((e) => e.id === id)!;
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>{t.customizer.extras[ex.id as keyof typeof t.customizer.extras]}</span>
                      <span className="font-display text-white text-lg">₹{ex.price}</span>
                    </div>
                  );
                })}
                <div className="border-t border-white border-opacity-20 my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-display text-white text-lg">{t.customizer.totalLabel}</span>
                  <span className="font-display text-3xl" style={{ color: "#FFB800" }}>₹{total}</span>
                </div>
              </div>

              <div className="mb-5 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{t.customizer.yourFaces}</p>
                <div className="flex flex-wrap gap-2">
                  {(mode === "predesigned" ? selectedPrepack?.emojis : selectedFaces)?.map((id: string, idx: number) => (
                    <FaceIcon key={idx} faceId={id} size={36} style={{ filter: mode === "predesigned" ? "none" : "invert(1) brightness(2)" }} />
                  ))}
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {mode === "predesigned" 
                    ? t.customizer.onEggs(12, selectedPrepack?.theme || "")
                    : t.customizer.onEggs(pack.qty, t.customizer.occasions[occasion as keyof typeof t.customizer.occasions])}
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
                {added ? t.customizer.addedBtn : t.customizer.addBtn}
              </button>
              <p className="text-xs text-center mt-3 font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
                {t.customizer.freeDelivery}
              </p>
            </div>

            <div className="rounded-3xl p-5 text-center" style={{ background: "linear-gradient(135deg, #FFE57F, #FFB800)" }}>
              <div className="mb-2" style={{ display: "flex", justifyContent: "center" }}>
                <FaceIcon faceId="happy" size={48} />
              </div>
              <p className="font-display text-sm" style={{ color: "#1A1A2E" }}>{t.customizer.weValue}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: "rgba(26,26,46,0.6)" }}>{t.customizer.printedWithLove}</p>
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
                <h3 className="font-display text-2xl mb-2" style={{ color: "#1A1A2E" }}>{t.customizer.modal.summaryTitle}</h3>
                <p className="text-sm font-semibold mb-6" style={{ color: "#666" }}>
                  {t.customizer.modal.thankYou(customerName)}
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
                    <span>{t.customizer.modal.pack}</span>
                    <span>{mode === "predesigned" ? selectedPrepack?.name : `${t.customizer.packs[pack.id as keyof typeof t.customizer.packs]} (${pack.qty} Eggs)`}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>{t.customizer.modal.occ}</span>
                    <span>{mode === "predesigned" ? selectedPrepack?.theme : t.customizer.occasions[occasion as keyof typeof t.customizer.occasions]}</span>
                  </div>
                  <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                    <span>{t.customizer.modal.faces}</span>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                      {(mode === "predesigned" ? selectedPrepack?.emojis : selectedFaces)?.map((id: string, idx: number) => (
                        <span key={idx} style={{ background: "white", padding: "2px 8px", borderRadius: "8px", fontSize: "0.75rem", border: "1px solid #e5e7eb" }}>
                          {FACES[id]?.emoji || FACES[id]?.label || id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>{t.customizer.modal.addons}</span>
                    <span>{extras.length > 0 ? extras.map(id => t.customizer.extras[id as keyof typeof t.customizer.extras]).join(", ") : "None"}</span>
                  </div>
                  <div style={{ borderTop: "1px solid #e5e7eb", margin: "12px 0 8px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.1rem", color: "#FF6B6B" }}>
                    <span>{t.customizer.modal.total}</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <button onClick={handleSendOrder} disabled={orderSending || orderSent} className="w-full font-display text-lg py-4 rounded-2xl mb-2" style={{ background: (orderSending || orderSent) ? '#aaa' : "linear-gradient(135deg, #FF6B6B, #FFB800)", color: "white", boxShadow: "0 6px 20px rgba(255,184,0,0.35)" }}>{orderSending ? t.customizer.modal.sendingBtn : (orderSent ? t.customizer.modal.joinedBtn : t.customizer.modal.sendBtn)}</button>
                <button onClick={() => { setShowFormModal(false); setOrderSent(false); setOrderConfirmed(false); }} className="w-full font-display text-lg py-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)", color: "white", boxShadow: "0 6px 20px rgba(255,184,0,0.35)" }}>{t.customizer.modal.closeBtn}</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📬</div>
                <h3 className="font-display text-2xl mb-2" style={{ color: "#1A1A2E" }}>{t.customizer.modal.enterDetails}</h3>
                <div className="flex flex-col gap-4" style={{ textAlign: "left" }}>
                  <input type="text" placeholder={t.customizer.modal.name} value={customerName} onChange={e => setCustomerName(e.target.value)} className="border p-2 rounded" />
                  <input type="text" placeholder={t.customizer.modal.address} value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="border p-2 rounded" />
                  <input type="tel" placeholder={t.customizer.modal.phone} value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="border p-2 rounded" />
                  {extras.includes("card") && (
                    <textarea placeholder={t.customizer.modal.message} value={customerMessage} onChange={e => setCustomerMessage(e.target.value)} className="border p-2 rounded" rows={3} />
                  )}
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
                  {t.customizer.modal.confirmBtn}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
