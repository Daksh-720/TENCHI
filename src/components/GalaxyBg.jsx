import Galaxy from './Galaxy';

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={true}
        density={2.3}
        glowIntensity={0.2}
        saturation={0}
        hueShift={180}
        twinkleIntensity={0.1}
        rotationSpeed={0.1}
        repulsionStrength={3.5}
        autoCenterRepulsion={0}
        starSpeed={0.7}
        speed={1}
      />
    </div>
  );
}