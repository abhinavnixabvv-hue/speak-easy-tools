import { motion } from "framer-motion";
import { Sparkles, ExternalLink } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 md:pb-24 md:pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-success/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* HexnicAI badge */}
        <motion.a
          href="https://hexnicai.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-soft transition-colors hover:bg-primary/10"
        >
          <Sparkles className="h-4 w-4" />
          Part of HexnicAI
          <ExternalLink className="h-3 w-3 opacity-60" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-soft ml-3"
        >
          AI-Powered Accessibility Tools
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Making Technology{" "}
          <span className="text-gradient-hero">Accessible</span>{" "}
          for Everyone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Empowering people with disabilities through innovative AI tools. 
          Voice-to-text for exams, adaptive reading for dyslexia, and 
          real-time sign language recognition.
        </motion.p>

        {/* HexnicAI CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <a
            href="https://hexnicai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 hover:shadow-lg"
          >
            Explore HexnicAI
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>No account required</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>Works offline</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
