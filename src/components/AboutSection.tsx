import React from "react";
import { Coffee, Compass, Feather } from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      icon: <Coffee className="w-5 h-5 text-[#C8A98E]" />,
      title: "Beri Jeda",
      desc: "Menepi sejenak dari hiruk pikuk bukan berarti tertinggal. Jeda adalah napas yang menjaga api semangat tetap menyala dengan hangat.",
    },
    {
      icon: <Feather className="w-5 h-5 text-[#8E9B8E]" />,
      title: "Ruang Rasa",
      desc: "Setiap emosi—senang, cemas, haru, maupun lelah—berhak mendapatkan tempat untuk diakui tanpa perlu buru-buru dihakimi.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#C8A98E]" />,
      title: "Nalar yang Jernih",
      desc: "Mengasah akal budi untuk membedakan antara hal yang bisa kita kendalikan dengan riuhnya hal-hal yang berada di luar jangkauan jemari kita.",
    },
  ];

  return (
    <section id="tentang" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E5DDD0]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Filosofi Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-5">
            Tentang Nalar Nanti
          </h2>
          <p className="font-sans text-base text-[#7A6F64] leading-relaxed">
            Sebuah rumah teduh digital yang diciptakan untuk menemani siapa pun yang sedang butuh ruang bernapas, berpikir jernih, dan merasa seutuhnya.
          </p>
        </div>

        {/* Narrative Box */}
        <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-8 sm:p-12 mb-16 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#3E362E] mb-4 leading-snug">
                Dua kata yang saling menguatkan: <br />
                <span className="text-[#C8A98E] italic">Nalar</span> dan{" "}
                <span className="text-[#8E9B8E] italic">Nanti</span>.
              </h3>
              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed mb-4">
                <strong>Nalar</strong> mewakili kejernihan akal dan kebijaksanaan untuk melihat kenyataan apa adanya tanpa ditenggelamkan oleh kepanikan.
              </p>
              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed">
                <strong>Nanti</strong> adalah izin welas asih untuk menunda kepanikan, melepaskan tuntutan instan, dan percaya bahwa setiap bunga memiliki musim mekarnya masing-masing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]">
              <blockquote className="font-serif italic text-base text-[#3E362E] leading-relaxed mb-4">
                “Di antara stimulus dan respons ada sebuah ruang. Di dalam ruang itulah terletak kebebasan dan kekuatan kita untuk memilih respons terbaik kita.”
              </blockquote>
              <p className="text-xs text-[#7A6F64] font-sans font-medium">
                — Prinsip Ruang Teduh Nalar Nanti
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h4 className="font-serif text-lg font-medium text-[#3E362E] mb-2">
                {pillar.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
