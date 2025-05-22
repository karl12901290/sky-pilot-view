
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Star } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Updated Header Section with hover effects */}
      <header className="fixed w-full top-0 z-50">
        <div className="mx-auto px-4 py-3">
          <div className="backdrop-blur-md bg-black/60 rounded-full px-4 border border-gray-800/50 flex justify-between items-center">
            <div className="flex items-center space-x-2 py-2">
              <Star className="text-skylog-primary h-6 w-6" />
              <h1 className="text-xl font-bold text-white">SkyLog<span className="text-skylog-primary">Pro</span></h1>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Link to="/auth/login">
                <Button variant="ghost" className="text-white hover:text-skylog-primary hover:bg-white/5 rounded-full">Log in</Button>
              </Link>
              <Link to="/auth/signup">
                <Button className="bg-skylog-primary hover:bg-skylog-primary/90 text-skylog-dark rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mt-16"> {/* Added margin top to account for fixed header */}
        {/* Hero Section */}
        <section className="relative bg-skylog-dark py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586639988441-53518e645852')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-skylog-dark"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-skylog-primary to-white bg-clip-text text-transparent">
                Advanced Drone Flight Analytics
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Take control of your drone flight data with professional analytics, real-time monitoring, and comprehensive tracking tools.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-skylog-primary hover:bg-skylog-primary/90 text-skylog-dark w-full sm:w-auto rounded-full">
                    Start for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/flights">
                  <Button size="lg" variant="outline" className="border-skylog-primary text-skylog-primary hover:bg-skylog-primary/10 w-full sm:w-auto rounded-full">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-skylog-dark to-[#161a25]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Powerful Flight Analysis Tools</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to analyze and improve your drone flights in one powerful platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Flight Path Visualization",
                  description: "View detailed 3D maps of your flight paths with comprehensive telemetry data.",
                  icon: <Star className="h-8 w-8 text-skylog-primary" />
                },
                {
                  title: "Battery Health Monitoring",
                  description: "Track battery performance and health over time to optimize flight duration.",
                  icon: <Shield className="h-8 w-8 text-skylog-primary" />
                },
                {
                  title: "Performance Analytics",
                  description: "Analyze flight performance metrics to improve piloting skills and efficiency.",
                  icon: <CheckCircle className="h-8 w-8 text-skylog-primary" />
                },
              ].map((feature, index) => (
                <div key={index} className="bg-skylog-card border border-skylog-border/50 rounded-lg p-6 hover:border-skylog-primary/50 transition-all">
                  <div className="mb-4 bg-skylog-primary/10 p-3 rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#161a25]">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-skylog-primary/20 to-skylog-primary/5 border border-skylog-primary/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Elevate Your Drone Experience?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join thousands of drone pilots who trust SkyLog Pro for their flight analytics needs.
              </p>
              <Link to="/auth/signup">
                <Button size="lg" className="bg-skylog-primary hover:bg-skylog-primary/90 text-skylog-dark">
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-[#12151e] border-t border-skylog-border/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Star className="text-skylog-primary h-5 w-5 mr-2" />
              <span className="text-white font-medium">SkyLog<span className="text-skylog-primary">Pro</span></span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SkyLog Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
