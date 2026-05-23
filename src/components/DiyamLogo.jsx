export default function DiyamLogo({ size = 40, className = '' }) {
  return (
    <img
      src="/products/LogoDiyam.jpeg"
      alt="Diyam LED Lighting Logo"
      width={size}
      height={size}
      className={`object-contain rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
