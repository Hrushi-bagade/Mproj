import { OverlayTrigger, Tooltip } from "react-bootstrap";

function LinkWithTooltip({ id, children, tooltip }) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
        placement="top"
        delayShow={300}
        delayHide={150}
      >
        <p>{children}</p>
      </OverlayTrigger>
    );
  }

  export default LinkWithTooltip