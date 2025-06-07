import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { getZodiacInfo } from "../utils/zodiacMeta";

// --- UI TEXTS ---
const UI_TEXT = {
  "Tiếng Việt": {
    appTitle: "🔮 Giải Mã Cuộc Đời AI",
    interface: "Giao diện",
    analyzing: "⏳ AI Đang phân tích dữ liệu... Vui lòng chờ trong giây lát!",
    analyze: "Phân tích",
    copy: "Sao chép",
    share: "Chia sẻ",
    gender: "Giới tính",
    male: "Nam",
    female: "Nữ",
    birthDate: "Ngày sinh",
    birthTime: "Giờ sinh",
    noTime: "Không rõ thời gian sinh",
    language: "Tiếng Việt",
    name: "Họ & Tên",
    result: "Kết quả",
    noInfo: "Không có thông tin cho mục này.",
    zodiac: "Cung hoàng đạo",
    element: "Nguyên tố",
    planet: "Hành tinh",
  },
  English: {
    appTitle: "🔮 Decode Your Life AI",
    interface: "Theme",
    analyzing: "⏳ AI Analyzing... Please wait!",
    analyze: "Analyze",
    copy: "📋 Copy",
    share: "🔗 Share",
    gender: "Gender",
    male: "Male",
    female: "Female",
    birthDate: "Birth date",
    birthTime: "Birth time",
    noTime: "⏳ Unknown birth time",
    language: "English",
    name: "Full Name",
    result: "Result",
    noInfo: "No information for this section.",
    zodiac: "Zodiac",
    element: "Element",
    planet: "Planet",
  },
};

// --- SECTIONS (Tabs) ---
const SECTIONS = [
  { "Tiếng Việt": "Tổng quan", English: "Overview", icon: "🧭" },
  { "Tiếng Việt": "Tính cách", English: "Personality", icon: "😎" },
  { "Tiếng Việt": "Tình yêu", English: "Love", icon: "💖" },
  { "Tiếng Việt": "Sự nghiệp", English: "Career", icon: "💼" },
  { "Tiếng Việt": "Gia đình", English: "Family", icon: "🏡" },
  { "Tiếng Việt": "Tâm linh", English: "Spirituality", icon: "🔮" },
  { "Tiếng Việt": "Sứ mệnh cuộc đời", English: "Life Mission", icon: "🌟" },
  { "Tiếng Việt": "Tiềm năng ẩn giấu", English: "Hidden Potential", icon: "🧬" },
  { "Tiếng Việt": "Nhân số học", English: "Numerology", icon: "🔢" },
  { "Tiếng Việt": "Human Design", English: "Human Design", icon: "🌈" },
];

export default function ZodiacForm() {
  // Google Fonts (Inter) - inject once
  React.useEffect(() => {
    if (!document.getElementById("inter-font")) {
      const link = document.createElement("link");
      link.id = "inter-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap";
      document.head.appendChild(link);
      document.body.style.fontFamily = `'Inter', 'sans-serif'`;
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    birth_time: "",
    gender: "",
    language: "Tiếng Việt",
  });

  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(SECTIONS[0]["Tiếng Việt"]);

  const lang = formData.language || "Tiếng Việt";
  const T = UI_TEXT[lang];

  // -- Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "language") {
      setActiveTab(SECTIONS[0][value]);
    }
  };

  // -- Submit: send a single POST to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setResults({});
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/zodiac-analysis`,
        { ...formData }
      );
      setResults(res.data);
    } catch (err) {
      // If error, fill all tabs with error message
      const errResults = {};
      SECTIONS.forEach((section) => {
        errResults[section[lang]] = `❌ ${T.noInfo}`;
      });
      setResults(errResults);
    } finally {
      setLoading(false);
    }
  };

  // -- Light/Dark Mode toggle
  const toggleMode = () => {
    document.documentElement.classList.toggle("light-mode");
  };

  // -- Animated background (inject CSS once)
  React.useEffect(() => {
    if (!document.getElementById("bg-ani")) {
      const style = document.createElement("style");
      style.id = "bg-ani";
      style.innerHTML = `
        body {
          background: linear-gradient(120deg, #1a1449, #443d8b 70%, #2a235c 100%);
          background-size: 200% 200%;
          animation: gradientMove 12s ease infinite;
        }
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // -- Responsive Container
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1449] to-[#2a235c] overflow-x-hidden px-1">
      <div
        className="
          w-full max-w-sm sm:max-w-xl mx-auto bg-white bg-opacity-20
          backdrop-blur-lg border border-white/20
          rounded-2xl shadow-2xl text-white relative
          transition-all duration-300 font-sans py-6 px-2 sm:py-8 sm:px-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center tracking-wide drop-shadow-lg font-sans">
            {T.appTitle}
          </h2>
          <div className="mx-auto w-20 sm:w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-700 animate-pulse mt-2" />
          <button
            onClick={toggleMode}
            className="px-4 py-1 rounded-xl bg-black bg-opacity-30 text-xs sm:text-sm font-semibold shadow-md hover:scale-105 transition-all border border-white/20 mt-3"
          >
            🌓 {T.interface}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-2">
          {/* Name */}
          <div className="flex items-center gap-x-3 bg-black bg-opacity-30 border border-white/10 rounded-xl px-3 py-2 mb-2">
            <span className="text-xl opacity-60">👤</span>
            <input
              type="text"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              className="w-full outline-none border-none text-white text-base placeholder-gray-300 bg-transparent"
              placeholder={T.name}
              required
            />
          </div>
          {/* Birth Date */}
          <div className="flex items-center gap-x-3 bg-black bg-opacity-30 border border-white/10 rounded-xl px-3 py-2 mb-2">
            <span className="text-xl opacity-60">📅</span>
            <input
              type="date"
              name="birth_date"
              onChange={handleChange}
              className="w-full outline-none border-none text-white text-base bg-transparent"
              required
              style={{ background: "transparent", colorScheme: "dark" }}
              placeholder={T.birthDate}
            />
          </div>
          {/* Birth Time */}
          <div className="flex items-center gap-x-3 bg-black bg-opacity-30 border border-white/10 rounded-xl px-3 py-2 mb-2">
            <span className="text-xl opacity-60">⏰</span>
            <select
              name="birth_time"
              onChange={handleChange}
              className="w-full outline-none border-none text-white text-base bg-transparent"
              style={{ minWidth: 0 }}
            >
              <option value="">{T.noTime}</option>
              {[...Array(48)].map((_, i) => {
                const hour = String(Math.floor(i / 2)).padStart(2, "0");
                const minute = i % 2 === 0 ? "00" : "30";
                return (
                  <option key={i} value={`${hour}:${minute}`}>
                    {`${hour}:${minute}`}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Gender */}
          <div className="flex items-center gap-x-3 bg-black bg-opacity-30 border border-white/10 rounded-xl px-3 py-2 mb-2">
            <span className="text-xl opacity-60">⚥</span>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full outline-none border-none text-white text-base bg-transparent"
              style={{ minWidth: 0 }}
            >
              <option value="">{T.gender}</option>
              <option value="male">{T.male}</option>
              <option value="female">{T.female}</option>
            </select>
          </div>
          {/* Language */}
          <div className="flex items-center gap-x-3 bg-black bg-opacity-30 border border-white/10 rounded-xl px-3 py-2 mb-2">
            <span className="text-xl opacity-60">🌐</span>
            <select
              name="language"
              onChange={handleChange}
              className="w-full outline-none border-none text-white text-base bg-transparent"
              style={{ minWidth: 0 }}
              value={formData.language}
            >
              <option value="Tiếng Việt">Tiếng Việt</option>
              <option value="English">English</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-500 via-fuchsia-600 to-purple-700
                       hover:scale-105 active:scale-95 hover:shadow-xl transition-all py-3
                       rounded-2xl font-bold tracking-wide shadow-lg text-lg sm:text-lg text-base
                       ${loading ? "opacity-60 cursor-wait" : ""}`}
          >
            {loading ? T.analyzing : T.analyze}
          </button>
        </form>

        {/* Results card */}
        {Object.keys(results).length > 0 && (
          <div className="mt-8 p-6 bg-black bg-opacity-40 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl fade-in prose prose-invert max-w-none relative">
            {/* Zodiac Info Header */}
            {formData.birth_date &&
              (() => {
                const zodiac = getZodiacInfo(formData.birth_date);
                return zodiac ? (
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{zodiac.icon}</div>
                      <div>
                        <p className="font-bold text-lg">{zodiac.name}</p>
                        <p className="text-sm">
                          {T.element}: {zodiac.element} – {T.planet}: {zodiac.planet}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {SECTIONS.map((section) => (
                <button
                  key={section[lang]}
                  onClick={() => setActiveTab(section[lang])}
                  className={`px-4 py-1 rounded-full transition-all text-base font-semibold shadow-md border 
                    ${
                      activeTab === section[lang]
                        ? "bg-gradient-to-r from-fuchsia-600 to-purple-500 text-white shadow-lg scale-105 border-purple-400"
                        : "bg-black bg-opacity-30 text-white hover:bg-opacity-50 border-white/10"
                    }`}
                  style={{ minWidth: 120 }}
                >
                  <span className="mr-1">{section.icon}</span>
                  {section[lang]}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="mt-2 min-h-[140px] text-base font-sans">
              <div className="flex items-center mb-2">
                <span className="text-lg">
                  {SECTIONS.find((s) => s[lang] === activeTab)?.icon}
                </span>
                <h3 className="text-lg font-extrabold ml-2">{activeTab}</h3>
              </div>
              {loading ? (
                <p>⏳ {T.analyzing}</p>
              ) : (
                <ReactMarkdown>
                  {results[activeTab] || T.noInfo}
                </ReactMarkdown>
              )}
            </div>

            {/* Copy/Share Buttons */}
            <div className="flex gap-4 mt-4 justify-end">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(results[activeTab] || "")
                }
                className="bg-purple-700 hover:bg-purple-800 px-4 py-1 rounded-full flex items-center gap-2 shadow-md transition"
              >
                <span role="img" aria-label="copy">
                  📋
                </span>
                {T.copy}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ text: results[activeTab] });
                  } else {
                    navigator.clipboard.writeText(results[activeTab]);
                    alert(T.copy);
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded-full flex items-center gap-2 shadow-md transition"
              >
                <span role="img" aria-label="share">
                  🔗
                </span>
                {T.share}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}