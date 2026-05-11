import { useState } from "react";
import { motion } from "framer-motion";

const sections = {
  "Location Intelligence": [
    "longitude",
    "latitude",
  ],
  "Property Characteristics": [
    "housing_median_age",
    "total_rooms",
    "total_bedrooms",
    "population",
    "households",
    "median_income",
  ],
  "AI Derived Metrics": [
    "rooms_per_household",
    "bedrooms_per_room",
    "population_per_household",
  ],
};

const oceanOptions = [
  "INLAND",
  "ISLAND",
  "NEAR_BAY",
  "NEAR_OCEAN",
];

export default function App() {
  const [formData, setFormData] = useState({
    longitude: "",
    latitude: "",
    housing_median_age: "",
    total_rooms: "",
    total_bedrooms: "",
    population: "",
    households: "",
    median_income: "",

    ocean_proximity_INLAND: 0,
    ocean_proximity_ISLAND: 0,
    ocean_proximity_NEAR_BAY: 1,
    ocean_proximity_NEAR_OCEAN: 0,

    rooms_per_household: "",
    bedrooms_per_room: "",
    population_per_household: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOceanSelect = (option) => {
    setFormData({
      ...formData,
      ocean_proximity_INLAND: 0,
      ocean_proximity_ISLAND: 0,
      ocean_proximity_NEAR_BAY: 0,
      ocean_proximity_NEAR_OCEAN: 0,
      [`ocean_proximity_${option}`]: 1,
    });
  };

  const handlePredict = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
              key,
              Number(value),
            ])
          )
        ),
      });

      const data = await response.json();

      setPrediction(data.predicted_price);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
            <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            AI Powered Real Estate Intelligence
          </div>

          <h1 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-6xl font-black tracking-tight text-transparent">
            House Price Prediction
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Premium machine learning platform powered by FastAPI,
            React, and XGBoost intelligence.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              p-8
              shadow-2xl
              backdrop-blur-2xl
            "
          >

            {Object.entries(sections).map(([section, fields]) => (

              <div key={section} className="mb-10">

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {section}
                  </h2>

                  <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-400/50 to-transparent" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {fields.map((field) => (

                    <div key={field} className="relative">

                      <input
                        type="number"
                        step="any"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder=" "
                        className="
                          peer
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          px-5
                          pb-3
                          pt-7
                          text-white
                          outline-none
                          transition-all
                          duration-300
                          backdrop-blur-xl
                          focus:border-cyan-400
                          focus:bg-white/10
                          focus:shadow-[0_0_40px_rgba(34,211,238,0.15)]
                        "
                      />

                      <label
                        className="
                          absolute
                          left-5
                          top-4
                          text-sm
                          text-slate-400
                          transition-all
                          duration-300
                          peer-focus:text-cyan-300
                        "
                      >
                        {field.replaceAll("_", " ")}
                      </label>

                    </div>

                  ))}

                </div>

              </div>

            ))}

            {/* Ocean Proximity */}
            <div className="mb-10">

              <h2 className="mb-6 text-xl font-semibold">
                Ocean Proximity
              </h2>

              <div className="grid grid-cols-2 gap-4">

                {oceanOptions.map((option) => {

                  const active =
                    formData[`ocean_proximity_${option}`] === 1;

                  return (
                    <button
                      key={option}
                      onClick={() => handleOceanSelect(option)}
                      className={`
                        rounded-2xl
                        border
                        px-5
                        py-4
                        text-sm
                        font-medium
                        transition-all
                        duration-300
                        ${
                          active
                            ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                            : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                        }
                      `}
                    >
                      {option.replaceAll("_", " ")}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* Predict Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePredict}
              className="
                relative
                w-full
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                px-8
                py-5
                text-lg
                font-semibold
                shadow-[0_0_40px_rgba(34,211,238,0.35)]
                transition-all
                duration-300
              "
            >

              <span className="relative z-10">
                {loading ? "Analyzing Market Intelligence..." : "Predict House Price"}
              </span>

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />

            </motion.button>

          </motion.div>

          {/* Prediction Panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              p-8
              backdrop-blur-2xl
            "
          >

            <div className="mb-10">

              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                AI Prediction Engine
              </div>

              <h2 className="text-4xl font-bold leading-tight">
                Intelligent Real Estate Valuation
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Advanced XGBoost intelligence analyzing location,
                demographics, and housing metrics.
              </p>

            </div>

            {/* Prediction Card */}
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-cyan-500/10
                via-blue-500/10
                to-slate-900
                p-8
              "
            >

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_50%)]" />

              <div className="relative z-10">

                <div className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
                  Predicted Market Value
                </div>

                <div className="text-6xl font-black tracking-tight text-white">

                  {prediction
                    ? `$${Number(prediction).toLocaleString()}`
                    : "--"}

                </div>

                <div className="mt-6 flex items-center gap-3">

                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-sm text-slate-300">
                    AI Confidence: High Accuracy Prediction
                  </span>

                </div>

              </div>

            </div>

            {/* Insight Cards */}
            <div className="mt-8 grid gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-sm text-slate-400">
                  AI Insight
                </div>

                <div className="mt-2 text-lg font-medium">
                  Premium valuation generated using advanced
                  machine learning market intelligence.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-sm text-slate-400">
                  Technology Stack
                </div>

                <div className="mt-2 flex flex-wrap gap-3">

                  {["React", "FastAPI", "XGBoost", "Tailwind"].map((tech) => (
                    <span
                      key={tech}
                      className="
                        rounded-full
                        border
                        border-cyan-400/20
                        bg-cyan-400/10
                        px-4
                        py-2
                        text-sm
                        text-cyan-300
                      "
                    >
                      {tech}
                    </span>
                  ))}

                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}
