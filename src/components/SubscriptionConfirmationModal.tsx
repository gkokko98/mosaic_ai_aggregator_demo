import { CloseIcon } from "@/components/icons";

interface SubscriptionConfirmationModalProps {
  open: boolean;
  appName: string;
  price: string;
  mode?: "subscribe" | "renew";
  onConfirm: () => void;
  onClose: () => void;
}

export function SubscriptionConfirmationModal({
  open,
  appName,
  price,
  mode = "subscribe",
  onConfirm,
  onClose,
}: SubscriptionConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-3xl border border-accent/40 bg-surface-alt p-6 text-center">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text-primary"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-text-primary">Confirm your plan</h2>

        <p className="mt-4 text-sm text-text-secondary">
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

        <p className="mt-3 text-xs text-text-secondary">
          You can stop future renewals via the service portal.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-app-bg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
