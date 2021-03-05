import "./confirmations.css";

export default function build(confirmations) {
    return `
       <label> Confirmations (${confirmations.length}) </label>
       <div class="confirmations">
         ${confirmations.map(address => (
           `<div class="confirmation">
               ${address}
            </div>`
         )).join('')}
       </div>
    `;
}
