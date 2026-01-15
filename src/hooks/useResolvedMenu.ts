import { useParams } from "react-router-dom";
import type { MenuItem } from "fog-ui";

export function useResolvedMenu(menu: Record<string, MenuItem[]>): Record<string, MenuItem[]> {
  const params = useParams();

  const resolvedMenu: Record<string, MenuItem[]> = {};

  Object.entries(menu).forEach(([group, items]) => {
    resolvedMenu[group] = items.map((item) => {
      let resolvedPath = item.path ?? "";
      Object.entries(params).forEach(([key, value]) => {
        resolvedPath = resolvedPath.replace(`:${key}`, value || "");
      });
      return { ...item, path: resolvedPath };
    });
  });

  return resolvedMenu;
}
