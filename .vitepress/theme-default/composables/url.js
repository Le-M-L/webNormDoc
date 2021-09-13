import { useData } from 'vitepress';

function joinPath(base, path) {
  return `${base}${path}`.replace(/\/+/g, '/');
}
export function useUrl() {
    const {site} = useData();
    function withBase(path) {
        return joinPath(site.value.base, path);
    }

    return {
        withBase,
    };
}
