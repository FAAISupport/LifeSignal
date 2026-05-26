import * as React from "react";

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} />;
}
