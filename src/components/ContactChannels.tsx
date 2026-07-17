"use client";

import { motion } from "framer-motion";
import { AtSign, MessageCircle } from "lucide-react";
import { contactChannels } from "@/data/contact";
import { Stagger, StaggerItem } from "./Motion";

const icons = {
  whatsapp: MessageCircle,
  instagram: AtSign,
} as const;

export function ContactChannels() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {contactChannels.map((channel) => {
        const iconKey = channel.icon || (channel.id.startsWith("instagram") ? "instagram" : channel.id);
        const Icon = icons[iconKey as keyof typeof icons] || MessageCircle;

        return (
          <StaggerItem key={channel.id}>
            <motion.a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="block h-full border border-[var(--line)] bg-[var(--bg-elevated)] p-6 transition-colors hover:border-[var(--ink)]"
            >
              <div
                className="inline-flex h-11 w-11 items-center justify-center"
                style={{ backgroundColor: `${channel.accent}22`, color: channel.accent }}
              >
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold">
                {channel.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {channel.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-[var(--forest)]">{channel.handle}</p>
            </motion.a>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
