import './LoadingScreen.css';

function LoadingScreen({ fading = false }) {
  return (
    <div
      className={`loading-screen ${fading ? 'loading-screen-fade-out' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-screen-inner">
        <span className="loading-fruit" aria-hidden="true">
          🍎
        </span>
        <h1>Dwarkadhish Orchards</h1>
        <p>Preparing your Himalayan orchard experience...</p>
        <div className="loading-bar" aria-hidden="true">
          <span className="loading-progress" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
