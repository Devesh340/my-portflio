import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, User, Code2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Internship() {
  const cert = "/certificate.jpg.png";

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="mx-auto max-w-5xl">
        <div className="glass grid grid-cols-1 gap-6 rounded-2xl p-6 md:grid-cols-[1fr_1.4fr] md:items-center transition-transform hover:-translate-y-1">
          {/* Certificate image */}
          <div className="overflow-hidden rounded-xl">
            <img src={cert} alt="Internship Certificate" className="h-64 w-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg gradient-bg text-white">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Company</div>
                <h3 className="font-display text-xl font-semibold">BridgeAi</h3>
              </div>
            </div>

            <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-[color:var(--brand-cyan)]" />
                <span>Devesh K — Full Stack Web Development Intern</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[color:var(--brand-cyan)]" />
                <span>01 June 2026 – 30 June 2026</span>
              </div>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              <div className="mb-2 font-medium">Institution: <span className="text-foreground/90">SNS College of Technology</span></div>
              <div className="mb-2">Department: <span className="text-foreground/90">Computer Science and Engineering</span></div>
              <div className="mb-2">Certificate Holder: <span className="text-foreground/90">Devesh K</span></div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Successfully completed a one-month Full Stack Web Development internship at BridgeAi. During the internship, I worked on web development concepts and strengthened my frontend and backend development skills. I demonstrated sincerity, persistence, and dedication throughout the training.
            </p>

            <div className="mb-4">
              <div className="mb-2 text-sm font-medium">Skills Learned</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "Responsive Web Design",
                  "Git & GitHub",
                ].map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    <Code2 className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={cert}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-cyan)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--brand-cyan)] transition-shadow shadow-sm hover:shadow-md"
              >
                View Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
