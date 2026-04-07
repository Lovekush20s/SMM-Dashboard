import React from "react";
import Index from "./Index";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">SocialSync Pro</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">How it Works</a>
          <a href="#">About</a>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700">
          Get Started
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 items-center px-8 py-16 bg-gradient-to-r from-blue-50 to-purple-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            All-in-One Social Media Workflow System
          </h1>
          <p className="text-lg mb-6">
            Plan, design, review, and publish content for multiple brands in one smart dashboard.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
              Get Started
            </button>
            <button className="bg-white px-6 py-3 rounded-full shadow hover:shadow-md">
              View Dashboard
            </button>
          </div>
        </div>

        {/* IMAGE PLACEHOLDER */}
        <div className="mt-10 md:mt-0">
          <img
            src="/dashboard-preview.png"
            alt="dashboard"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          All-in-One Social Media Workflow System
        </h2>
        <p className="mb-10 text-gray-600">
          Plan, design, review, and publish content for multiple brands.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {["Plan Content", "Generate with AI", "Design Creatives", "Publish"].map(
            (item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="font-semibold">{item}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Manage Multiple Brands",
            "AI Content Generation",
            "Approval Workflow",
            "Social Publishing",
            "Analytics Tracking",
            "Content Calendar",
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
            >
              <h3 className="font-semibold">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start Managing Your Social Media Smarter Today!
        </h2>
        <button   onClick={() => navigate("/Index")}
 className="bg-white text-blue-600 px-6 py-3 rounded-full shadow hover:shadow-lg">
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 SocialSync Pro. All rights reserved.
      </footer>
    </div>
  );
}