import React from 'react';
import { CloudAbstractSvg, DragonMinimalSvg, BambooFlowSvg, WaveDynamicSvg } from '../common/ChineseMotifs';
import { Sparkles, Layers, RefreshCw, Feather } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'คัดแยก PP เกรดบริสุทธิ์สูงจากโรงงาน',
      desc: 'รับชิ้นส่วนเหลือทิ้งจากกระบวนการผลิตแม่พิมพ์ยานยนต์และบรรจุภัณฑ์อาหาร โดยไม่ผสมสารปนเปื้อน เพื่อคงคุณสมบัติความเหนียว ยืดหยุ่น และทนต่อแรงกระแทกได้เทียบเท่าของใหม่',
      icon: Layers,
    },
    {
      num: '02',
      title: 'หลอมขึ้นรูปด้วยการไหลแบบ Gradient',
      desc: 'นวัตกรรมการควบคุมอุณหภูมิและความหนืดของเนื้อพลาสติกเหลว ทำให้เม็ดสีสองเฉดผสานกันอย่างเป็นธรรมชาติ เกิดเป็นเอกลักษณ์เฉพาะตัว (Unrepeatable Marbling & Gradient) ในเก้าอี้ทุกตัว',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'ถอดรหัสเก้าอี้จีนราชวงศ์หมิงสู่มินิมอล',
      desc: 'ลดทอนลวดลายดั้งเดิมที่รกรุงรัง ให้เหลือเพียงเส้นโค้งเกือกม้า (Horseshoe Crest) อันสง่างาม ผสานลวดลายสัญลักษณ์นามธรรม ลายคลื่น ลายเมฆ ลายไผ่ และมังกรเรขาคณิต',
      icon: Feather,
    },
    {
      num: '04',
      title: 'ระบบหมุนเวียนปิด 100% Circular Lifecycle',
      desc: 'เก้าอี้ทุกตัวสามารถนำกลับมาบดหลอมใหม่ได้ไม่รู้จบ ร่วมกับโปรแกรม Green Loyalty เมื่อส่งคืนกล่องหรือซากผลิตภัณฑ์ จะได้รับ Green Points สำหรับแลกคอลเลกชันใหม่',
      icon: RefreshCw,
    },
  ];

  const designMotifs = [
    {
      name: 'Abstract Cloud (เมฆาลอยคว้าง)',
      icon: CloudAbstractSvg,
      desc: 'สัญลักษณ์แห่งความสงบสุขและความเป็นมงคล นำเสนอด้วยเส้นโค้งสรีระเดี่ยวเบาบาง',
    },
    {
      name: 'Minimal Dragon (มังกรเรขาคณิต)',
      icon: DragonMinimalSvg,
      desc: 'พลังอำนาจแห่งธรรมชาติที่ลดรูปสู่เส้นลายเฉียบคม ไม่ฟุ่มเฟือย แต่อบอวลด้วยพลัง',
    },
    {
      name: 'Bamboo Flow (ข้อปล้องไผ่ลู่ลม)',
      icon: BambooFlowSvg,
      desc: 'คุณธรรมแห่งความยืดหยุ่นไม่หักโค่น สะท้อนโครงสร้างขาเก้าอี้ที่รับน้ำหนักได้กว่า 180 กก.',
    },
    {
      name: 'Wave Dynamic (ระลอกคลื่นหวนกลับ)',
      icon: WaveDynamicSvg,
      desc: 'ตัวแทนแห่งวัฏจักรน้ำและการนำกลับมาใช้ใหม่ เปรียบเสมือนคลื่นที่ซัดคืนสู่ชายฝั่ง',
    },
  ];

  return (
    <section className="py-18 lg:py-24 border-b border-white/10 bg-[#0D0F11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C23E2F] font-medium mb-3">
            01. Brand Philosophy & Circular Craft
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight text-balance leading-snug">
            จากขยะพลาสติกโรงงานสู่งานประติมากรรมเก้าอี้จีนแห่งศตวรรษที่ 21
          </h2>
          <p className="mt-4 text-neutral-300 text-base leading-relaxed">
            เรามองเห็นคุณค่าในสิ่งที่อุตสาหกรรมมองข้าม พลาสติกพอลิโพรพีลีน (PP) ที่ทนทาน แข็งแกร่ง แต่มักถูกทิ้งเป็นเศษขอบแม่พิมพ์ ถูกนำมาผ่านการชำระล้าง แปรสภาพ และหล่อหลอมด้วยจิตวิญญาณแห่งเครื่องเรือนจีนโบราณ
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-num text-xs font-semibold text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10">
                      PHASE {step.num}
                    </span>
                    <IconComponent className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chinese Contemporary Design Motif Language */}
        <div className="pt-8 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
              Aesthetic DNA
            </span>
            <h3 className="text-xl font-semibold text-white mt-1">
              ภาษาการออกแบบ Chinese Contemporary: ความงามที่ไม่ตะโกน
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">
              หลีกหนีลวดลายจีนแบบเดิมที่แน่นขนัด ด้วยการใช้เส้นสายมินิมอล ลายคลื่นนามธรรม และการไล่โทนสีแร่อัญมณี
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designMotifs.map((motif) => {
              const MotifIcon = motif.icon;
              return (
                <div
                  key={motif.name}
                  className="p-5 rounded-lg bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="p-2.5 rounded-md bg-white/5 text-[#E86A17] shrink-0 border border-white/10">
                    <MotifIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{motif.name}</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{motif.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
