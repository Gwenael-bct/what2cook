export default function IconCard({ icon: Icon, gradientId, gradient, color }) {
  return (
      <svg width="48" height="48" viewBox="0 0 24 24">
        {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                {gradient.map((stop, i) => (
                    <stop key={i} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
        )}
        <Icon
            sx={{
              fontSize: 48,
              fill: gradient ? `url(#${gradientId})` : color || "currentColor",
            }}
        />
      </svg>
  );
}
