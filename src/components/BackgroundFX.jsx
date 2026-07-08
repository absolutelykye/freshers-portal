/* Ambient site background: aurora orbs, twinkling stars, shooting stars.
   Pure transform/opacity animations — cheap to composite. */
export default function BackgroundFX() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-stars bg-stars-sm" />
      <div className="bg-stars bg-stars-lg" />
      <div className="bg-shooting-star" />
      <div className="bg-shooting-star bg-shooting-star-2" />
    </div>
  )
}
