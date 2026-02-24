const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Large gradient orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
          top: '-10%',
          right: '-10%',
          animationDelay: '0s',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))',
          bottom: '-15%',
          left: '-10%',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))',
          top: '40%',
          left: '50%',
          animationDelay: '4s',
        }}
      />
      
      {/* Smaller floating elements */}
      <div 
        className="absolute w-24 h-24 rounded-2xl opacity-30 floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), transparent)',
          top: '20%',
          left: '15%',
          animationDelay: '1s',
          transform: 'rotate(45deg)',
        }}
      />
      <div 
        className="absolute w-16 h-16 rounded-full opacity-25 floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--accent) / 0.4), transparent)',
          top: '60%',
          right: '20%',
          animationDelay: '3s',
        }}
      />
      <div 
        className="absolute w-32 h-32 rounded-3xl opacity-20 floating"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.3), transparent)',
          bottom: '20%',
          right: '10%',
          animationDelay: '5s',
          transform: 'rotate(-15deg)',
        }}
      />
    </div>
  );
};

export default FloatingShapes;
