import './Hud.css';

interface HudProps {
  alertLevel: 'high' | 'medium' | 'low' | 'none';
}

export function Hud({ alertLevel }: HudProps) {
  const isHighAlert = alertLevel === 'high';

  return (
    <div className="hud">
      <div className="hud-item">
        <h3>Overall Mine Status</h3>
        <p className={isHighAlert ? 'status-alert' : 'status-safe'}>
          {isHighAlert ? 'HIGH ALERT' : 'Safe'}
        </p>
      </div>
      {/* <div className="hud-item">
        <h3>Active High-Risk Zones</h3>
        <p>0</p>
      </div> */}
    </div>
  );
}