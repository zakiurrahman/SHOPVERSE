import type { Metadata } from "next";
import { ContactChannels } from "@/components/ContactChannels";
import { Reveal } from "@/components/Motion";
import { storeInfo } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach SHOPVERSE on WhatsApp or Instagram.",
};

export default function ContactPage() {
  return (
    <div className="mesh-bg noise relative min-h-[80vh] overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Say hello
          </p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl">
            Contact {storeInfo.brand}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">
            Skip the cart — message us directly for sizes, availability, orders, and collabs.
            We reply on WhatsApp and Instagram first.
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {storeInfo.hours} · {storeInfo.location}
          </p>
        </Reveal>

        <div className="mt-12">
          <ContactChannels />
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 max-w-2xl border border-[var(--line)] bg-[var(--bg-elevated)] p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              How ordering works
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--ink-soft)]">
              <li>Pick an item from the shop and note your size & color.</li>
              <li>Message us on WhatsApp or Instagram with the product name.</li>
              <li>We confirm stock, price, and delivery — then you pay & we ship.</li>
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
