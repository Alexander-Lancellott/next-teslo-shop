import { forwardRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

export const theme = fullConfig.theme;

export function forwardRefWithAs<
  T extends { name: string; displayName?: string },
>(component: T): T & { displayName: string } {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  });
}
