import buildConfirmations from './confirmations';
import "./transaction.css";

export default function build({ id, attributes, confirmations }) {
  const { value, executed, destination } = attributes;
  return `
    <div class="transaction">
      <label> Transaction (#${id})</label>
      <div class="info">
        <div class="destination">
          <strong>Destination</strong>: ${destination}
        </div>
        <div class="value">
          <strong>Value</strong>: ${value}
        </div>
        <div class="executed">
          <strong>Executed</strong>: ${executed}
        </div>
      </div>
      ${buildConfirmations(confirmations)}
      <div class="actions">
        <div id="confirm-${id}" class="button"> Confirm Transaction </div>
      </div>
    </div>
  `;
}
