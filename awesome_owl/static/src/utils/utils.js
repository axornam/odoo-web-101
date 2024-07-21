/** @odoo-module **/

import { onMounted, useRef } from "@odoo/owl";

export function useAutoFocus(elementName) {
  let inputRef = useRef(elementName);
  onMounted(() => {
    inputRef.el.focus();
  });
}

//export function useAutoFocus(name) {
//let ref = useRef(name);
//useEffect(
//(el) => el && el.focus(),
//() => [ref.el]
//);
//}
