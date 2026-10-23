"use client";

import { useRouter } from "next/navigation";
import { actions } from "@/lib/store";

// Entering individual gifting from the landing page starts a fresh personal box.
export default function useStartGifting() {
  const router = useRouter();
  return () => {
    if (actions.setMode("individual")) actions.toast("Gift box cleared — you've left corporate gifting.");
    router.push("/gifting");
  };
}
