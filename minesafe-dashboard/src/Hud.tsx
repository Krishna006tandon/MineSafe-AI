import './Hud.css';

export function Hud({ alertLevel }) {
  const isHighAlert = alertLevel === 'high';

  return (
    <div className="hud">
      <div className="hud-item">
        <h3>Overall Mine Status</h3>
        <p className={isHighAlert ? 'status-alert' : 'status-safe'}>
          {isHighAlert ? 'HIGH ALERT' : 'Safe'}
        </p>
      </div>
      <div className="hud-item">
        <h3>Active High-Risk Zones</h3>
        <p>1</p>
      </div>
    </div>
  );
}