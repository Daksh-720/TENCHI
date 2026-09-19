import { memo } from 'react';
import Galaxy from './Galaxy';

function GalaxyBackground({ paused = false }) {
  return (
    <div className="fixed inset-0 z-0">
      <Galaxy
        paused={paused}
        mouseRepulsion={false}
        mouseInteraction={!paused}
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

export default memo(GalaxyBackground);