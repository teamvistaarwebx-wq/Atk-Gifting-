import { PhoneIcon } from "./Icons";

export const PHONE_DISPLAY = "+91 12345 67890";
export const PHONE_HREF = "tel:+911234567890";

export default function TalkBanner() {
  return (
    <div>
      <div className="festoon mt-2" aria-hidden />
      <a
        href={PHONE_HREF}
        className="mt-10 flex h-14 items-center justify-center gap-3 bg-gradient-to-r from-[#8e2639] to-[#a85c68] font-serif text-sm font-semibold tracking-wide text-white sm:text-base"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-maroon">
          <PhoneIcon />
        </span>
        TALK TO US – {PHONE_DISPLAY}
      </a>
    </div>
  );
}
