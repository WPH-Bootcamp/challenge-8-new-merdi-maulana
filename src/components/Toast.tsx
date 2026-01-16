import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div
      className={`fixed z-50 flex items-center gap-3 transition-all duration-300 ease-out ${
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
      style={{
        width: "531px",
        height: "52px",
        borderRadius: "24px",
        top: "114px",
        left: "50%",
        transform: `translateX(-50%) ${
          isAnimating ? "translateY(0)" : "translateY(-16px)"
        }`,
        gap: "12px",
        paddingTop: "0",
        paddingRight: "32px",
        paddingBottom: "0",
        paddingLeft: "32px",
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
      }}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-white font-medium text-sm">{message}</span>
    </div>
  );
}

export default Toast;
