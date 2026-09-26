'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useTransition } from 'react';
import type {
  PaginationState,
  SortingState,
  Updater,
} from '@tanstack/react-table';

function resolveUpdater<T>(updater: Updater<T>, prev: T): T {
  return typeof updater === 'function'
    ? (updater as (old: T) => T)(prev)
    : updater;
}

const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

export const useDataTableUrlState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageIndex = Math.max(0, Number(searchParams.get('page') ?? '1') - 1);
  const pageSize = Math.max(
    Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE),
  );
  const sortField = searchParams.get('sortBy') ?? undefined;
  const sortDir = searchParams.get('sortDir') ?? 'ASC';
  const search = searchParams.get('q') ?? '';

  const pagination: PaginationState = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  );

  const sorting: SortingState = useMemo(
    () => (sortField ? [{ id: sortField, desc: sortDir === 'desc' }] : []),
    [sortField, sortDir],
  );

  const pushParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value == '') params.delete(key);
        else params.set(key, value);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      });
    },
    [pathname, searchParams, router],
  );

  const onPaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      const next = resolveUpdater(updater, pagination);
      pushParams({
        page: String(next.pageIndex + 1),
        pageSize: String(next.pageSize),
      });
    },
    [pagination, pushParams],
  );

  const onSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      const next = resolveUpdater(updater, sorting);
      const first = next[0];
      pushParams({
        sortBy: first?.id ?? null,
        sortDir: first ? (first.desc ? 'desc' : 'asc') : null,
        page: '1', // reset to page 1 whenever sort changes
      });
    },
    [sorting, pushParams],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        pushParams({ q: value || null, page: '1' });
      }, SEARCH_DEBOUNCE_MS);
    },
    [pushParams],
  );

  return {
    pagination,
    sorting,
    search,
    onPaginationChange,
    onSortingChange,
    onSearchChange,
    isPending,
  };
};
