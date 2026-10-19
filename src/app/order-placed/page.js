"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { DISPATCH_TEXT, PROOF_APPROVAL_TEXT } from "@/lib/giftBox";
import { rupees } from "@/lib/format";
import { CheckIcon } from "@/components/Icons";

export default function OrderPlacedPage() {
  const order = useStore((s) => s.orders[0]);

  if (!order) {
    return (
      <section className="container-atk py-20 text-center">
        <h1 className="font-serif text-3xl">No recent order</h1>
        <Link href="/gifting" className="btn-primary mt-6">
          Browse the collection
        </Link>
      </section>
    );
  }

  return (
    <section className="container-atk max-w-2xl py-16">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-maroon text-white">
        <CheckIcon width={22} height={22} />
      </span>
      <h1 className="mt-5 font-serif text-3xl text-maroon">Thank you — your order is placed</h1>
      <p className="mt-2 text-muted">
        Order <span className="font-semibold text-ink">{order.ref}</span> · {rupees(order.total)}
      </p>

      <div className="panel mt-8 space-y-3 p-5 text-sm">
        <p className="font-semibold text-ink">{DISPATCH_TEXT}</p>
        <p className="text-muted">{PROOF_APPROVAL_TEXT}</p>
        <p className="text-muted">
          We&apos;ll send updates to {order.customer.email} and on WhatsApp at {order.customer.phone}.
        </p>
      </div>

      <ul className="mt-6 divide-y divide-line text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{rupees(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>

      <Link href="/" className="btn-outline mt-8">
        Back to home
      </Link>
    </section>
  );
}
