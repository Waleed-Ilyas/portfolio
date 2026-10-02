import { profile } from "@/content/profile";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 gap-2 p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <a href="#contact" className="btn btn-primary">Hire me</a>
        <a href={profile.whatsapp} className="btn" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={profile.cv} className="btn">CV</a>
      </div>
    </div>
  );
}
