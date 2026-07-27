import { CloseIcon } from "@/components/icons";

/** Props for {@link SubscriptionConfirmationModal}. */
interface SubscriptionConfirmationModalProps {
  /**
   * Whether the modal is shown. Fully controlled by the parent — there is no
   * internal open/closed state here, so the parent owns when and why this
   * appears (e.g. only after tapping Subscribe/Renew, never on mount).
   */
  open: boolean;
  /** Name of the app being subscribed to/renewed, interpolated into the body copy. */
  appName: string;
  /** Price string (already formatted, e.g. "$4.99/month") shown in the body copy. */
  price: string;
  /**
   * Swaps the body copy between subscribe and renew framing ("subscribe to"
   * vs. "renew your plan for") without the caller needing two near-duplicate
   * modal components for what is otherwise identical chrome/behavior.
   */
  mode?: "subscribe" | "renew";
  /** Called when the user taps Confirm — the caller performs the actual subscribe/renew. */
  onConfirm: () => void;
  /** Called on any dismissal path (backdrop click, close icon). */
  onClose: () => void;
}

/**
 * Centered confirm dialog shared by ServiceDetails and WideAppCard's
 * Subscribe/Renew flows. Deliberately has no local state — every piece of
 * data it displays and every action it triggers is passed in by the parent,
 * so the same component can be reused across both call sites without
 * duplicating the confirm-then-commit logic.
 */
export function SubscriptionConfirmationModal({
  open,
  appName,
  price,
  mode = "subscribe",
  onConfirm,
  onClose,
}: SubscriptionConfirmationModalProps) {
  // Fully controlled: rendering nothing when closed (rather than hiding via
  // CSS) keeps this component stateless and avoids leaking dialog markup
  // into the DOM when it isn't in use.
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative w-full rounded-2xl border border-nav-border bg-app-gradient px-6 pb-8 pt-10 text-center shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 text-accent-dark/60 hover:text-accent-dark"
        >
          <CloseIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-text-primary">Confirm your plan</h2>

        <p className="mt-4 text-sm text-white/80">
          {mode === "renew" ? (
            <>
              You're about to renew your plan for <strong className="text-accent">{appName}</strong> for{" "}
              <strong className="text-accent">{price}</strong>.
            </>
          ) : (
            <>
              You're about to subscribe to <strong className="text-accent">{appName}</strong> for{" "}
              <strong className="text-accent">{price}</strong>.
            </>
          )}
        </p>

        <p className="mt-3 text-sm text-white/80">
          You can stop future renewals via the service portal.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-8 rounded-full border border-accent-dark bg-accent-dark/60 px-6 py-3 text-base font-bold uppercase tracking-wide text-white shadow-[0_0_10px_3px_rgba(15,16,21,0.6)]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
