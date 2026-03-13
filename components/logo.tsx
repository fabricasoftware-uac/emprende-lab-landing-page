import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 glow-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] ${className}`}
      style={{ width: size + 16, height: size + 16 }}
    >
      <Image
        src="/apple-icon.svg"
        alt="EmprendeLab Logo"
        width={size}
        height={size}
        className="object-contain invert brightness-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </div>
  );
}
