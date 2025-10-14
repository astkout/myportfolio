const HeroSpline = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <iframe
      loading="lazy"
      src="https://my.spline.design/orb-lBx8VShg4tXiLw3fCAuxOn8L/"
      title="Spline Orb Background"
      frameBorder="0"
      className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
      style={{ border: 0 }}
    />
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
  </div>
);

export default HeroSpline;
