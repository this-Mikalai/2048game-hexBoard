import { CSSProperties, FC } from 'react';
import { getColorsBg } from '../utils';
import './HexItem.css';
import { TransformToHexCoordinates } from '../types/gameTypes';

const divider = 1.25;
interface HexProps {
  className: string;
  dataAtr: TransformToHexCoordinates;
  style: CSSProperties;
}

const HexItem: FC<HexProps> = (props) => {
  const {
    className,
    dataAtr: { x, y, z, value },
    style,
  } = props;

  const colorHex = value ? getColorsBg(value) : '';

  return (
    <div style={{ ...style }} className={className} data-x={x} data-y={y} data-z={z} data-value={value || 0}>
      <span
        className={`blockClip`}
        style={{
          background: colorHex,
          width: (style.width as number) / divider,
          height: (style.height as number) / divider,
        }}
      >
        <span className="num">{value}</span>
      </span>
    </div>
  );
};

export default HexItem;
